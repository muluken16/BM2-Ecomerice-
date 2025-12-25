import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../theme/theme';
import { useApp } from '../context/AppContext';

const ChatScreen = ({ navigation, route }) => {
    const { recipient, jobId, isSupport } = route.params || {};
    const { user, chats, sendMessage, userMode } = useApp();
    const [message, setMessage] = useState('');

    const channelId = isSupport ? 'support' : (jobId || 'job_1');
    const messages = chats[channelId] || [];

    const flatListRef = useRef();

    const handleSend = async () => {
        if (!message.trim()) return;

        await sendMessage(channelId, message);
        setMessage('');
    };

    const renderMessage = ({ item }) => {
        // For support chat, 'support' is the other sender
        // For job chat, 'technician' or 'customer' is the sender
        const isMyMessage = item.sender === (userMode === 'customer' ? 'customer' : 'technician');

        return (
            <View
                style={[
                    styles.messageContainer,
                    isMyMessage ? styles.myMessage : styles.theirMessage,
                ]}
            >
                <View
                    style={[
                        styles.bubble,
                        isMyMessage ? styles.myBubble : styles.theirBubble,
                    ]}
                >
                    <Text
                        style={[
                            styles.messageText,
                            isMyMessage ? styles.myMessageText : styles.theirMessageText,
                        ]}
                    >
                        {item.text}
                    </Text>
                    <Text
                        style={[
                            styles.timestamp,
                            isMyMessage ? styles.myTimestamp : styles.theirTimestamp,
                        ]}
                    >
                        {new Date(item.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    </Text>
                </View>
            </View>
        );
    };

    const getRecipientName = () => {
        if (isSupport) return 'Customer Support';
        return recipient?.name || 'User';
    };

    const getRecipientInitial = () => {
        if (isSupport) return 'S';
        return recipient?.name?.charAt(0) || 'U';
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={theme.colors.textPrimary} />
                </TouchableOpacity>

                <View style={styles.headerInfo}>
                    <View style={[styles.avatar, isSupport && styles.supportAvatar]}>
                        {isSupport ? (
                            <Ionicons name="headset" size={24} color={theme.colors.white} />
                        ) : (
                            <Text style={styles.avatarText}>
                                {getRecipientInitial()}
                            </Text>
                        )}
                    </View>
                    <View>
                        <Text style={styles.recipientName}>{getRecipientName()}</Text>
                        <Text style={styles.statusText}>Online</Text>
                    </View>
                </View>

                {!isSupport && (
                    <TouchableOpacity style={styles.callButton}>
                        <Ionicons name="call" size={24} color={theme.colors.primary} />
                    </TouchableOpacity>
                )}
            </View>

            {/* Messages */}
            <FlatList
                ref={flatListRef}
                data={messages}
                renderItem={renderMessage}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.messagesList}
                onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No messages yet. Start the conversation!</Text>
                    </View>
                }
            />

            {/* Input Area */}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
            >
                <View style={styles.inputContainer}>
                    <TouchableOpacity style={styles.attachButton}>
                        <Ionicons name="add" size={24} color={theme.colors.primary} />
                    </TouchableOpacity>

                    <TextInput
                        style={styles.input}
                        value={message}
                        onChangeText={setMessage}
                        placeholder="Type a message..."
                        placeholderTextColor={theme.colors.gray400}
                        multiline
                    />

                    <TouchableOpacity
                        style={[
                            styles.sendButton,
                            !message.trim() && styles.sendButtonDisabled,
                        ]}
                        onPress={handleSend}
                        disabled={!message.trim()}
                    >
                        <Ionicons name="send" size={20} color={theme.colors.white} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 50,
        paddingBottom: theme.spacing.md,
        paddingHorizontal: theme.spacing.md,
        backgroundColor: theme.colors.white,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
        ...theme.shadow.sm,
    },
    backButton: {
        padding: theme.spacing.sm,
    },
    headerInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: theme.spacing.sm,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: theme.spacing.sm,
    },
    avatarText: {
        color: theme.colors.white,
        fontWeight: 'bold',
        fontSize: theme.fontSize.md,
    },
    recipientName: {
        fontSize: theme.fontSize.md,
        fontWeight: theme.fontWeight.semibold,
        color: theme.colors.textPrimary,
    },
    statusText: {
        fontSize: theme.fontSize.xs,
        color: theme.colors.success,
    },
    callButton: {
        padding: theme.spacing.sm,
    },
    messagesList: {
        padding: theme.spacing.md,
        paddingBottom: theme.spacing.xl,
    },
    messageContainer: {
        marginBottom: theme.spacing.md,
        maxWidth: '80%',
    },
    myMessage: {
        alignSelf: 'flex-end',
    },
    theirMessage: {
        alignSelf: 'flex-start',
    },
    bubble: {
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.lg,
    },
    myBubble: {
        backgroundColor: theme.colors.primary,
        borderBottomRightRadius: 2,
    },
    theirBubble: {
        backgroundColor: theme.colors.white,
        borderBottomLeftRadius: 2,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    messageText: {
        fontSize: theme.fontSize.md,
        marginBottom: 4,
    },
    myMessageText: {
        color: theme.colors.white,
    },
    theirMessageText: {
        color: theme.colors.textPrimary,
    },
    timestamp: {
        fontSize: 10,
        alignSelf: 'flex-end',
    },
    myTimestamp: {
        color: 'rgba(255, 255, 255, 0.7)',
    },
    theirTimestamp: {
        color: theme.colors.textSecondary,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing.md,
        backgroundColor: theme.colors.white,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
    },
    attachButton: {
        padding: theme.spacing.sm,
    },
    input: {
        flex: 1,
        backgroundColor: theme.colors.gray100,
        borderRadius: theme.borderRadius.lg,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        marginHorizontal: theme.spacing.sm,
        maxHeight: 100,
        fontSize: theme.fontSize.md,
    },
    sendButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sendButtonDisabled: {
        backgroundColor: theme.colors.gray400,
    },
    supportAvatar: {
        backgroundColor: theme.colors.secondary,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: theme.spacing.xxl,
    },
    emptyText: {
        color: theme.colors.textSecondary,
        fontSize: theme.fontSize.md,
    },
});

export default ChatScreen;
