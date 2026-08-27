"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mic, X, ChevronDown, ChevronUp, HelpCircle, Activity, ChefHat, Globe, MoreVertical } from "lucide-react"
import { useVoice } from "@/hooks/use-voice"
import { useUserState } from "@/hooks/use-user-state"
import { VoiceWaveAnimation } from "@/components/voice-wave-animation"
import { usePathname } from "next/navigation"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function AssistantUI({
    messages = [],
    onSendMessage
}: {
    messages?: Array<{ role: "user" | "assistant", content: string }>,
    onSendMessage: (text: string) => void
}) {
    const {
        isListening,
        transcript,
        isSpeaking,
        dialogState,
        error,
        language,
        startListening,
        stopListening,
        isSupported,
        setLanguage,
        stopSpeaking,
        mode,
        clearTranscript
    } = useVoice()

    const { user, promoteToAdmin } = useUserState() as any

    const [isOpen, setIsOpen] = useState(false)
    const [showHelp, setShowHelp] = useState(false)
    const [inputText, setInputText] = useState("")
    const pathname = usePathname()
    const contentRef = useRef<HTMLDivElement>(null)

    // Auto-scroll to bottom
    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.scrollTop = contentRef.current.scrollHeight
        }
    }, [messages, transcript, isOpen])

    // Manual open only - we don't want it popping up automatically anymore
    // (Removed auto-open useEffect on user request)

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault()
        if (!inputText.trim()) return
        onSendMessage(inputText)
        setInputText("")
    }

    // Context-aware hints
    const getHints = () => {
        const isHindi = language === "hi-IN"

        if (pathname === "/") {
            return isHindi
                ? ["रेसिपी दिखाओ", "प्रोफाइल", "डार्क मोड", "मदद करो"]
                : ["Go to Recipes", "Go to Profile", "Dark Mode", "How it works"]
        }

        if (pathname.includes("/recipes")) {
            return isHindi
                ? ["होम पेज", "प्रोफाइल", "डार्क मोड", "एडमिन पेज"]
                : ["Go to Home", "Go to Profile", "Dark Mode", "Admin Dashboard"]
        }

        if (pathname.includes("/cook")) {
            return isHindi
                ? ["अगला स्टेप", "वापस", "5 मिनट का टाइमर", "रुको"]
                : ["Next step", "Repeat step", "Set timer for 5 mins", "Stop"]
        }

        return isHindi
            ? ["होम पेज", "रेसिपी दिखाओ", "मदद करो", "एडमिन पेज"]
            : ["Go to Home", "Go to Recipes", "How it works", "Admin Dashboard"]
    }

    const hints = getHints()

    if (!isSupported) return null

    return (
        <>
            {/* Click Outside Backdrop */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 z-40 bg-transparent"
                    />
                )}
            </AnimatePresence>

            <div id="assistant-ui-root" className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-4 pointer-events-none max-w-[calc(100vw-2rem)] sm:max-w-none">
                <div className="pointer-events-auto">
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                                className="w-[calc(100vw-2rem)] sm:w-96 bg-card/95 backdrop-blur-md border border-primary/20 shadow-2xl rounded-3xl overflow-hidden flex flex-col h-[50dvh] sm:h-[500px]"
                            >
                                {/* Header */}
                                <div className="p-4 bg-primary/10 flex items-center justify-between border-b border-primary/10 shrink-0">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${isListening ? "bg-green-500 animate-pulse" : "bg-yellow-500"}`} />
                                        <span className="font-semibold text-sm">
                                            {dialogState === "LISTENING" ? (language === "hi-IN" ? "सुन रहा हूँ..." : "Listening...") :
                                                dialogState === "SPEAKING" ? (language === "hi-IN" ? "बोल रहा हूँ..." : "Speaking...") :
                                                    dialogState === "PROCESSING" ? (language === "hi-IN" ? "सोच रहा हूँ..." : "Thinking...") :
                                                        (language === "hi-IN" ? "टॉक-टू-टेस्ट" : "TalkToTaste")}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setLanguage(language === "en-IN" ? "hi-IN" : "en-IN")}
                                            className="text-xs font-bold px-3 py-1 rounded-full bg-primary/10 hover:bg-primary/20 border border-primary/20 transition-all flex items-center gap-1 active:scale-95"
                                        >
                                            <Globe className="w-3 h-3" />
                                            {language === "hi-IN" ? "English" : "हिंदी"}
                                        </button>
                                        <button
                                            onClick={() => {
                                                stopSpeaking();
                                                stopListening();
                                                setIsOpen(false);
                                            }}
                                            className="hover:bg-primary/20 p-1 rounded-full text-muted-foreground"
                                            title="Close Assistant"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                {/* Chat Content */}
                                <div className="p-4 flex-1 overflow-y-auto flex flex-col gap-3" ref={contentRef}>

                                    {/* Welcome Message if empty */}
                                    {messages.length === 0 && !transcript && (
                                        <div className="text-center text-muted-foreground text-sm py-8 space-y-2">
                                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                                                <Activity className="w-6 h-6 text-primary" />
                                            </div>
                                            <p>{language === "hi-IN" ? "मैं आपकी क्या मदद कर सकता हूँ?" : "How can I help you today?"}</p>
                                        </div>
                                    )}

                                    {/* Message History */}
                                    {messages.map((msg, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm ${msg.role === "user"
                                                ? "self-end bg-primary text-primary-foreground rounded-tr-sm shadow-md"
                                                : "self-start bg-secondary text-secondary-foreground rounded-tl-sm shadow-sm"
                                                }`}
                                        >
                                            <div className="space-y-2 whitespace-pre-wrap leading-relaxed">
                                                {msg.content.split('\n').map((line, i) => {
                                                    if (line.startsWith('###')) {
                                                        return <h3 key={i} className="font-bold text-base mt-4 mb-2 text-primary">{line.replace('###', '').trim()}</h3>;
                                                    }
                                                    if (line.startsWith('**')) {
                                                        return <p key={i} className="font-bold mt-2">{line.replace(/\*\*/g, '').trim()}</p>;
                                                    }
                                                    return <p key={i}>{line}</p>;
                                                })}
                                            </div>
                                        </motion.div>
                                    ))}

                                    {/* Live Transcript (Transient) */}
                                    {transcript && isListening && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="self-end bg-primary/50 text-primary-foreground/80 px-4 py-2 rounded-2xl rounded-tr-sm text-sm max-w-[85%] italic"
                                        >
                                            {transcript}...
                                        </motion.div>
                                    )}

                                    {isListening && !transcript && (
                                        <div className="self-end text-xs text-muted-foreground pt-2">
                                            <VoiceWaveAnimation isActive={true} className="h-4 w-12 text-primary" />
                                        </div>
                                    )}
                                </div>

                                {/* Input Area */}
                                <div className="p-3 bg-secondary/30 shrink-0 space-y-3">
                                    {/* Hints */}
                                    {showHelp && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="flex flex-wrap gap-2 overflow-hidden pb-2"
                                        >
                                            {hints.map((hint, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => onSendMessage(hint)}
                                                    className="text-xs px-2 py-1 bg-background border border-border rounded-full text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                                                >
                                                    {hint}
                                                </button>
                                            ))}

                                        </motion.div>
                                    )}

                                    <div className="flex items-center gap-2">
                                        <form onSubmit={handleSubmit} className="flex-1 relative">
                                            <input
                                                type="text"
                                                value={inputText}
                                                onChange={(e) => setInputText(e.target.value)}
                                                placeholder={error ? (language === "hi-IN" ? "माइक्रोफ़ोन समस्या" : "Mic Issue") : (language === "hi-IN" ? "पूछिए..." : "Ask anything...")}
                                                className={`w-full px-4 py-2 rounded-full bg-background dark:bg-card/90 border text-sm text-foreground placeholder:text-gray-500 dark:placeholder:text-gray-300 font-medium focus:outline-none focus:ring-2 pr-10 ${error ? "border-red-500 ring-red-100" : "border-input focus:ring-primary/20"}`}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowHelp(!showHelp)}
                                                className={`absolute right-2 top-1/2 -translate-y-1/2 transition-colors ${showHelp ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
                                                title={language === "hi-IN" ? "मदद" : "Help"}
                                            >
                                                <HelpCircle className="w-4 h-4" />
                                            </button>
                                        </form>
                                        <button
                                            onClick={() => {
                                                console.log("Assistant mic clicked. State:", { isListening, isSupported, error });
                                                if (isListening) {
                                                    stopListening();
                                                } else {
                                                    startListening({ continuous: true });
                                                }
                                            }}
                                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isListening ? "bg-red-500 text-white animate-pulse" : "bg-primary text-primary-foreground"
                                                }`}
                                        >
                                            {isListening ? <VoiceWaveAnimation isActive={true} className="h-4 w-4" /> : <Mic className="w-5 h-5" />}
                                        </button>
                                    </div>

                                    {/* Dev Admin Bridge */}
                                    {process.env.NODE_ENV === 'development' && user?.role !== 'admin' && (
                                        <button 
                                            onClick={() => promoteToAdmin()}
                                            className="w-full mt-2 text-[10px] text-primary/40 hover:text-primary/100 border border-dashed border-primary/20 rounded py-1 transition-all"
                                        >
                                            🚀 Promote Session to Admin (Dev Only)
                                        </button>
                                    )}

                                    {error && (
                                        <div className="space-y-1">
                                            <p className="text-[10px] text-red-500 text-center font-medium">{error}</p>
                                            {error.includes("denied") && (
                                                <p className="text-[9px] text-muted-foreground text-center leading-tight">
                                                    Tip: Secure connection (HTTPS) is required for Voice. Try using <b>localhost</b> or <b>ngrok</b>.
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Persistent Toggle Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`pointer-events-auto h-16 w-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${isOpen
                        ? "bg-primary/80 hover:bg-primary"
                        : "bg-primary hover:bg-primary/90"
                        }`}
                >
                    <ChefHat className="w-8 h-8 text-white" />
                </button>
            </div >
        </>
    )
}
