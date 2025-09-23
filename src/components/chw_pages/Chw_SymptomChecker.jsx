import React, { useEffect, useRef, useState } from "react";
import {
  Send,
  Mic,
  MicOff,
  Upload,
  FileText,
  Image as ImageIcon,
  Bot,
  User,
  Stethoscope,
  AlertCircle,
  CheckCircle,
  Clock,
  Download,
  Trash2,
  Globe,
  Play,
  Pause,
} from "lucide-react";

/**
 * SymptomChecker
 * - Advanced, responsive telemedicine-style chat UI
 * - Use this component as a client-side prototype. Replace simulated AI responses
 *   with real API calls to your backend / OpenAI / clinical models.
 *
 * Notes on integration:
 * - Replace simulateBotResponse(...) with API call to your AI model.
 * - For file analysis, upload file to your server and return structured analysis.
 */

const DEFAULT_GREETING = `Hello! I'm your AI Health Assistant. 
Describe your symptoms (you can use your language), upload any lab reports or images, or use voice input. I will give a preliminary analysis — not a diagnosis.`;

export default function SymptomChecker() {
  const [messages, setMessages] = useState(() => {
    try {
      const s = localStorage.getItem("symptom_chat");
      return s ? JSON.parse(s) : [
        {
          id: Date.now(),
          type: "bot",
          content: DEFAULT_GREETING,
          timestamp: new Date().toISOString(),
        },
      ];
    } catch {
      return [
        {
          id: Date.now(),
          type: "bot",
          content: DEFAULT_GREETING,
          timestamp: new Date().toISOString(),
        },
      ];
    }
  });

  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [language, setLanguage] = useState("en");
  const [summary, setSummary] = useState("");
  const messagesRef = useRef(null);
  const fileInputRef = useRef(null);

  // Speech recognition (browser)
  const recognitionRef = useRef(null);
  useEffect(() => {
    // Initialize Web Speech API if available
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = language || "en-US";
      recognitionRef.current.maxAlternatives = 1;

      recognitionRef.current.onresult = (e) => {
        const spoken = Array.from(e.results).map(r => r[0].transcript).join("");
        setInputText((prev) => (prev ? prev + " " + spoken : spoken));
      };
      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
      recognitionRef.current.onerror = (err) => {
        console.warn("Speech recognition error:", err);
        setIsRecording(false);
      };
    }
    // cleanup: none (we reuse)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  useEffect(() => {
    localStorage.setItem("symptom_chat", JSON.stringify(messages));
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  };

  const pushMessage = (msg) => {
    setMessages(prev => [...prev, msg]);
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;
    const userMsg = {
      id: Date.now() + Math.random(),
      type: "user",
      content: inputText.trim(),
      timestamp: new Date().toISOString(),
    };
    pushMessage(userMsg);
    setInputText("");
    setIsTyping(true);

    // Simulate/Call AI
    try {
      // Replace this with a real API call:
      const botMsg = await simulateBotResponse(userMsg.content);
      pushMessage(botMsg);
    } catch (err) {
      pushMessage({
        id: Date.now() + Math.random(),
        type: "bot",
        content: "Sorry, something went wrong while analyzing. Please try again later.",
        timestamp: new Date().toISOString(),
      });
    } finally {
      setIsTyping(false);
    }
  };

  // Simulated AI response - replace with backend call
  const simulateBotResponse = async (userText) => {
    // small delay to appear realistic
    await new Promise(res => setTimeout(res, 1200));

    // Simple keyword heuristics to make a "realistic" response for demo
    const lower = userText.toLowerCase();
    const approx = [
      { name: "Fever", keywords: ["fever", "temperature", "hot"], prob: 75 },
      { name: "Cough", keywords: ["cough", "coughing"], prob: 65 },
      { name: "Headache", keywords: ["headache", "head pain", "migraine"], prob: 70 },
      { name: "Fatigue", keywords: ["tired", "fatigue", "sleep"], prob: 60 },
      { name: "Diarrhea", keywords: ["diarrhea", "loose stool"], prob: 55 },
    ];

    // pick conditions based on keywords
    const possibleConditions = approx
      .map(c => ({ ...c, score: c.keywords.reduce((s,k) => s + (lower.includes(k) ? 1 : 0), 0) }))
      .filter(c => c.score > 0)
      .map((c, i) => ({ name: c.name, probability: Math.min(95, c.probability + c.score * 10), severity: c.probability > 70 ? "Moderate" : "Mild" }));

    const fallbackCondition = possibleConditions.length === 0 ? [
      { name: "Viral or Common Infection", probability: 45, severity: "Mild" }
    ] : possibleConditions;

    const recommendations = [
      "Stay hydrated and rest.",
      "Use over-the-counter symptom relief as appropriate.",
      "Monitor temperature and breathing; seek care if symptoms worsen.",
    ];

    return {
      id: Date.now() + Math.random(),
      type: "bot",
      content: `Thanks — based on what you described, here are some possibilities and next steps.`,
      analysis: {
        possibleConditions: fallbackCondition,
        recommendations,
        urgency: detectUrgency(userText),
      },
      timestamp: new Date().toISOString(),
    };
  };

  const detectUrgency = (text) => {
    const t = text.toLowerCase();
    if (/(chest pain|shortness of breath|faint|unconscious|severe bleeding|severe difficulty breathing)/.test(t)) {
      return "High — seek emergency care immediately";
    }
    if (/(fever.*\b(40|104)|uncontrolled vomiting|cannot keep fluids)/.test(t)) {
      return "Moderate — consider urgent care";
    }
    return "Low — monitor and consult if persistent/worsening";
  };

  // File upload
  const handleFileInput = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newFiles = files.map(file => {
      const id = Date.now() + Math.random();
      const isImage = file.type.startsWith("image/");
      const preview = isImage ? URL.createObjectURL(file) : null;
      // push a user message per uploaded file
      pushMessage({
        id,
        type: "user",
        content: `Uploaded: ${file.name}`,
        fileMeta: {
          name: file.name,
          type: file.type,
          size: file.size,
          preview,
        },
        timestamp: new Date().toISOString(),
      });
      return {
        id,
        file,
        name: file.name,
        preview,
        type: file.type,
        size: file.size,
      };
    });

    setUploadedFiles(prev => [...prev, ...newFiles]);

    // Simulate analysis for each file (replace with real upload & backend analysis)
    newFiles.forEach((nf, idx) => {
      setTimeout(() => {
        pushMessage({
          id: Date.now() + Math.random(),
          type: "bot",
          content: `I've analyzed your ${nf.name} and returned a brief summary.`,
          analysis: {
            fileAnalysis: {
              fileName: nf.name,
              findings: [
                "Basic checks OK",
                "Minor flag: review lipid panel if present",
                "Consider follow-up with GP"
              ]
            }
          },
          timestamp: new Date().toISOString(),
        });
      }, 1500 + idx * 800);
    });

    // reset input to allow same file re-upload if needed
    e.target.value = "";
  };

  const handleVoiceToggle = () => {
    // Start/stop Web Speech API
    const rec = recognitionRef.current;
    if (!rec) {
      alert("Voice input not supported in this browser.");
      return;
    }
    if (!isRecording) {
      try {
        rec.lang = language === "en" ? "en-US" : language; // simplistic map
        rec.start();
        setIsRecording(true);
      } catch (err) {
        console.warn(err);
        alert("Could not start voice recognition.");
      }
    } else {
      rec.stop();
      setIsRecording(false);
    }
  };

  // quick suggestions
  const QUICK_SYMPTOMS = [
    "Fever and body aches",
    "Cough and sore throat",
    "Headache and dizziness",
    "Stomach pain",
    "Fatigue for several days",
  ];

  const addQuick = (text) => {
    setInputText(text);
  };

  // download transcript (TXT / JSON)
  const downloadTranscript = (type = "txt") => {
    const filename = `symptom_transcript_${new Date().toISOString().slice(0,19)}.${type === "json" ? "json" : "txt"}`;
    if (type === "json") {
      const blob = new Blob([JSON.stringify(messages, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
      return;
    }
    // TXT
    const lines = messages.map(m => {
      const ts = new Date(m.timestamp).toLocaleString();
      if (m.type === "user") return `[User - ${ts}]: ${m.content}${m.fileMeta ? ` (file: ${m.fileMeta.name})` : ""}`;
      let extra = "";
      if (m.analysis) extra = `\nAnalysis: ${JSON.stringify(m.analysis, null, 2)}`;
      return `[Bot - ${ts}]: ${m.content}${extra}`;
    }).join("\n\n");
    const blob = new Blob([lines], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearConversation = () => {
    if (!confirm("Clear conversation? This cannot be undone.")) return;
    const botGreeting = {
      id: Date.now(),
      type: "bot",
      content: DEFAULT_GREETING,
      timestamp: new Date().toISOString(),
    };
    setMessages([botGreeting]);
    setUploadedFiles([]);
    setSummary("");
  };

  // simple client-side summary (placeholder)
  const generateSummary = () => {
    const userTexts = messages.filter(m => m.type === "user").map(m => m.content).join(". ");
    const maybe = userTexts.length ? userTexts.slice(0, 500) : "No symptoms described yet.";
    const s = `Summary (auto): ${maybe}\n\nRecommendations: Rest, hydrate, monitor symptoms. Seek medical care if red flags present.`;
    setSummary(s);
  };

  // keyboard send (Ctrl+Enter)
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-white py-6 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-teal-600 p-2 rounded-full">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">AI Symptom Checker</h2>
              <p className="text-sm text-gray-600">Describe symptoms, upload reports, or use voice — receive preliminary insights.</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 text-sm">
              <Globe className="w-4 h-4 text-gray-500" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="border rounded px-2 py-1 text-sm"
                aria-label="Select language for voice & assistant"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="pa">ਪੰਜਾਬੀ</option>
                {/* Add more locales mapping if you plan to use server-side translation */}
              </select>
            </label>

            <button
              onClick={() => downloadTranscript("txt")}
              className="flex items-center gap-2 bg-white border rounded px-3 py-2 text-sm hover:shadow"
              title="Download transcript (TXT)"
            >
              <Download className="w-4 h-4" />
              Export
            </button>

            <button
              onClick={() => downloadTranscript("json")}
              className="hidden md:inline-flex items-center gap-2 bg-white border rounded px-3 py-2 text-sm hover:shadow"
              title="Download transcript (JSON)"
            >
              JSON
            </button>

            <button
              onClick={clearConversation}
              className="hidden md:inline-flex items-center gap-2 bg-white border rounded px-3 py-2 text-sm hover:bg-red-50"
              title="Clear conversation"
            >
              <Trash2 className="w-4 h-4 text-gray-600" />
              Clear
            </button>
          </div>
        </div>

        {/* Chat Card */}
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* conversation area */}
          <div className="md:grid md:grid-cols-3">
            {/* Left: quick actions / files (mobile stacked) */}
            <aside className="md:col-span-1 border-r hidden md:block p-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Quick Symptoms</h4>
                  <div className="flex flex-wrap gap-2">
                    {QUICK_SYMPTOMS.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => addQuick(q)}
                        className="text-xs px-3 py-1 rounded-full bg-teal-50 border text-teal-700 hover:bg-teal-100"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Uploaded Files</h4>
                  <div className="space-y-2">
                    {uploadedFiles.length === 0 ? (
                      <div className="text-xs text-gray-500">No files uploaded yet</div>
                    ) : (
                      uploadedFiles.map(f => (
                        <div key={f.id} className="flex items-center gap-2">
                          {f.preview ? (
                            <img src={f.preview} alt={f.name} className="w-10 h-10 rounded object-cover border" />
                          ) : (
                            <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center border">
                              <FileText className="w-4 h-4 text-gray-500" />
                            </div>
                          )}
                          <div className="flex-1">
                            <div className="text-sm">{f.name}</div>
                            <div className="text-xs text-gray-500">{Math.round(f.size/1024)} KB</div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Conversation Summary</h4>
                  <div className="text-xs text-gray-600 mb-2">
                    Generate a quick summary of the chat (client-side). Replace with server summary for clinical-grade summaries.
                  </div>
                  <div className="flex gap-2">
                    <button onClick={generateSummary} className="px-3 py-1 bg-teal-600 text-white rounded text-sm">Generate</button>
                    <button onClick={() => navigator.clipboard?.writeText(summary)} className="px-3 py-1 border rounded text-sm">Copy</button>
                  </div>
                  {summary && <pre className="mt-3 text-xs bg-gray-50 p-2 rounded h-24 overflow-auto">{summary}</pre>}
                </div>
              </div>
            </aside>

            {/* Center: chat area */}
            <section className="md:col-span-2 flex flex-col">
              <div ref={messagesRef} className="p-4 flex-1 overflow-y-auto h-[60vh] md:h-[70vh] space-y-4 bg-gradient-to-b from-gray-50 to-white">
                {messages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`flex items-start gap-3 max-w-[92%] ${msg.type === "user" ? "flex-row-reverse" : ""}`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${msg.type === "user" ? "bg-teal-600" : "bg-gradient-to-r from-teal-500 to-teal-600"}`}>
                        {msg.type === "user" ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
                      </div>

                      <div className={`${msg.type === "user" ? "text-right" : "text-left"} max-w-full`}>
                        <div className={`${msg.type === "user" ? "bg-teal-600 text-white" : "bg-white border shadow-sm"} px-4 py-3 rounded-2xl`}>
                          <p className="text-sm whitespace-pre-wrap break-words">{msg.content}</p>

                          {msg.fileMeta && (
                            <div className="mt-2">
                              {msg.fileMeta.preview ? (
                                <img src={msg.fileMeta.preview} alt={msg.fileMeta.name} className="max-w-xs rounded border" />
                              ) : (
                                <div className="flex items-center gap-2 text-xs text-gray-600">
                                  <FileText className="w-4 h-4" />
                                  {msg.fileMeta.name}
                                </div>
                              )}
                            </div>
                          )}

                          {/* analysis block */}
                          {msg.analysis && (
                            <div className="mt-3 space-y-2">
                              {msg.analysis.possibleConditions && (
                                <div className="bg-teal-50 p-3 rounded">
                                  <div className="flex items-center gap-2 text-sm font-semibold text-teal-700"><AlertCircle className="w-4 h-4" /> Possible conditions</div>
                                  <div className="mt-2 space-y-2">
                                    {msg.analysis.possibleConditions.map((c, i) => (
                                      <div key={c.name + i} className="flex items-center justify-between gap-3">
                                        <div className="text-xs text-gray-700">{c.name}</div>
                                        <div className="flex items-center gap-2">
                                          <div className="w-28 h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div style={{ width: `${c.probability}%` }} className="h-2 bg-teal-600 rounded-full" />
                                          </div>
                                          <div className="text-xs text-gray-600">{c.probability}%</div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {msg.analysis.recommendations && (
                                <div className="bg-green-50 p-3 rounded">
                                  <div className="flex items-center gap-2 text-sm font-semibold text-green-700"><CheckCircle className="w-4 h-4" /> Recommendations</div>
                                  <ul className="mt-2 text-xs text-gray-700 space-y-1">
                                    {msg.analysis.recommendations.map((r, i) => <li key={i}>• {r}</li>)}
                                  </ul>
                                </div>
                              )}

                              {msg.analysis.urgency && (
                                <div className="bg-yellow-50 p-2 rounded text-xs text-yellow-800 inline-flex items-center gap-2">
                                  <Clock className="w-4 h-4" />
                                  <strong>Urgency: </strong> <span className="ml-1">{msg.analysis.urgency}</span>
                                </div>
                              )}

                              {msg.analysis.fileAnalysis && (
                                <div className="bg-blue-50 p-2 rounded text-xs">
                                  <div className="font-semibold text-blue-800">File analysis - {msg.analysis.fileAnalysis.fileName}</div>
                                  <ul className="text-xs text-gray-700 mt-1">
                                    {msg.analysis.fileAnalysis.findings.map((f, i) => <li key={i}>• {f}</li>)}
                                  </ul>
                                </div>
                              )}
                            </div>
                          )}

                        </div>

                        <div className="text-[11px] text-gray-500 mt-1">
                          {new Date(msg.timestamp).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-white border px-3 py-2 rounded-2xl shadow-sm">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                        <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* input area */}
              <div className="p-4 border-t bg-gray-50">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 rounded-full bg-white border hover:shadow"
                    aria-label="Upload files"
                  >
                    <Upload className="w-5 h-5 text-gray-600" />
                  </button>
                  <input ref={fileInputRef} type="file" multiple accept="image/*,.pdf,.doc,.docx" className="hidden" onChange={handleFileInput} />

                  <button
                    onClick={handleVoiceToggle}
                    className={`p-2 rounded-full ${isRecording ? "bg-red-500 text-white" : "bg-teal-600 text-white"}`}
                    title="Toggle voice input"
                  >
                    {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </button>

                  <div className="flex-1">
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Describe your symptoms or type a question. Press Ctrl+Enter to send."
                      className="w-full px-4 py-3 rounded-full border focus:outline-none focus:ring-2 focus:ring-teal-500"
                      aria-label="Chat input"
                    />
                    <div className="text-xs text-gray-400 mt-1">Tip: Use quick symptoms or upload reports to speed analysis.</div>
                  </div>

                  <button
                    onClick={handleSend}
                    disabled={!inputText.trim()}
                    className={`p-3 rounded-full ${inputText.trim() ? "bg-teal-600 text-white" : "bg-gray-300 text-gray-500"}`}
                    aria-label="Send message"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}


// import React, { useState, useRef, useEffect } from "react";
// import {
//   Send,
//   Mic,
//   MicOff,
//   Upload,
//   FileText,
//   Image,
//   Bot,
//   User,
//   Stethoscope,
//   AlertCircle,
//   CheckCircle,
//   Clock,
// } from "lucide-react";

// const SymptomChecker = () => {
//   const [messages, setMessages] = useState([
//     {
//       id: 1,
//       type: "bot",
//       content:
//         "Hello! I'm your AI Health Assistant. Please describe your symptoms, or upload any medical reports you'd like me to review.",
//       timestamp: new Date(),
//     },
//   ]);
//   const [inputText, setInputText] = useState("");
//   const [isRecording, setIsRecording] = useState(false);
//   const [isTyping, setIsTyping] = useState(false);
//   const [uploadedFiles, setUploadedFiles] = useState([]);
//   const fileInputRef = useRef(null);
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const handleSendMessage = () => {
//     if (inputText.trim() === "") return;

//     const userMessage = {
//       id: Date.now(),
//       type: "user",
//       content: inputText,
//       timestamp: new Date(),
//     };

//     setMessages((prev) => [...prev, userMessage]);
//     setInputText("");
//     setIsTyping(true);

//     // Simulate AI response
//     setTimeout(() => {
//       setMessages((prev) => [...prev, generateBotResponse(inputText, prev)]);
//       setIsTyping(false);
//     }, 2000);
//   };

//   const generateBotResponse = (userInput, prevMessages) => {
//     const responses = [
//       {
//         content:
//           "Based on your symptoms, I'm analyzing several possibilities. Can you tell me how long you've been experiencing these symptoms and their severity level (1-10)?",
//         analysis: null,
//       },
//       {
//         content:
//           "I understand you're experiencing discomfort. Here are some preliminary insights:",
//         analysis: {
//           possibleConditions: [
//             { name: "Common Cold", probability: 75, severity: "Mild" },
//             { name: "Viral Infection", probability: 60, severity: "Mild to Moderate" },
//             { name: "Allergic Reaction", probability: 45, severity: "Mild" },
//           ],
//           recommendations: [
//             "Get plenty of rest and stay hydrated",
//             "Monitor your symptoms for any changes",
//             "Consider over-the-counter remedies for relief",
//             "Consult a healthcare provider if symptoms worsen",
//           ],
//           urgency: "Low - Monitor symptoms",
//         },
//       },
//     ];

//     const randomResponse =
//       responses[Math.floor(Math.random() * responses.length)];

//     return {
//       id: Date.now(),
//       type: "bot",
//       content: randomResponse.content,
//       analysis: randomResponse.analysis,
//       timestamp: new Date(),
//     };
//   };

//   const handleVoiceToggle = () => {
//     setIsRecording((prev) => !prev);
//     if (!isRecording) {
//       console.log("🎙️ Starting voice recording...");
//     } else {
//       console.log("🛑 Stopping voice recording...");
//       setTimeout(() => {
//         setInputText(
//           "I've been having headaches and feeling tired for the past two days"
//         );
//       }, 1000);
//     }
//   };

//   const handleFileUpload = (event) => {
//     const files = Array.from(event.target.files);
//     const newFiles = files.map((file) => ({
//       id: Date.now() + Math.random(),
//       name: file.name,
//       type: file.type,
//       size: file.size,
//     }));

//     setUploadedFiles((prev) => [...prev, ...newFiles]);

//     files.forEach((file) => {
//       const fileMessage = {
//         id: Date.now(),
//         type: "user",
//         content: `Uploaded file: ${file.name}`,
//         fileType: file.type.startsWith("image/") ? "image" : "document",
//         timestamp: new Date(),
//       };

//       setMessages((prev) => [...prev, fileMessage]);

//       setTimeout(() => {
//         const analysisResponse = {
//           id: Date.now() + 1,
//           type: "bot",
//           content: `I've analyzed your ${
//             file.type.startsWith("image/") ? "medical image" : "report"
//           }. Here are my findings:`,
//           analysis: {
//             fileAnalysis: {
//               fileName: file.name,
//               findings: [
//                 "Blood pressure readings are within normal range",
//                 "Cholesterol levels slightly elevated",
//                 "Recommend follow-up with physician",
//               ],
//             },
//           },
//           timestamp: new Date(),
//         };
//         setMessages((prev) => [...prev, analysisResponse]);
//       }, 3000);
//     });
//   };

//   const formatTime = (date) => {
//     return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-teal-100">
//       {/* Header */}
//       <div className="bg-white shadow-lg border-b border-teal-100">
//         <div className="max-w-4xl mx-auto px-4 py-4 flex items-center space-x-3">
//           <div className="bg-teal-600 p-2 rounded-full">
//             <Stethoscope className="w-6 h-6 text-white" />
//           </div>
//           <div>
//             <h1 className="text-2xl font-bold text-gray-800">
//               AI Symptom Checker
//             </h1>
//             <p className="text-sm text-teal-600">
//               Get instant health insights powered by AI
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Chat */}
//       <div className="max-w-4xl mx-auto px-4 py-6">
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//           {/* Messages */}
//           <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-50 to-white">
//             {messages.map((message) => (
//               <div
//                 key={message.id}
//                 className={`flex ${
//                   message.type === "user" ? "justify-end" : "justify-start"
//                 }`}
//               >
//                 <div
//                   className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${
//                     message.type === "user"
//                       ? "flex-row-reverse space-x-reverse"
//                       : ""
//                   }`}
//                 >
//                   {/* Avatar */}
//                   <div
//                     className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
//                       message.type === "user"
//                         ? "bg-teal-600"
//                         : "bg-gradient-to-r from-teal-500 to-teal-600"
//                     }`}
//                   >
//                     {message.type === "user" ? (
//                       <User className="w-5 h-5 text-white" />
//                     ) : (
//                       <Bot className="w-5 h-5 text-white" />
//                     )}
//                   </div>

//                   {/* Bubble */}
//                   <div
//                     className={`rounded-2xl px-4 py-3 ${
//                       message.type === "user"
//                         ? "bg-teal-600 text-white"
//                         : "bg-white shadow-md border border-gray-100"
//                     }`}
//                   >
//                     <p
//                       className={`text-sm ${
//                         message.type === "user"
//                           ? "text-white"
//                           : "text-gray-800"
//                       }`}
//                     >
//                       {message.content}
//                     </p>

//                     {/* Analysis */}
//                     {message.analysis && (
//                       <div className="mt-3 space-y-3">
//                         {message.analysis.possibleConditions && (
//                           <div className="bg-teal-50 rounded-lg p-3">
//                             <h4 className="text-sm font-semibold text-teal-800 mb-2 flex items-center">
//                               <AlertCircle className="w-4 h-4 mr-2" />
//                               Possible Conditions
//                             </h4>
//                             {message.analysis.possibleConditions.map(
//                               (condition, idx) => (
//                                 <div
//                                   key={condition.name + idx}
//                                   className="flex justify-between items-center py-1"
//                                 >
//                                   <span className="text-xs text-gray-700">
//                                     {condition.name}
//                                   </span>
//                                   <div className="flex items-center space-x-2">
//                                     <div className="w-12 bg-gray-200 rounded-full h-2">
//                                       <div
//                                         className="bg-teal-600 h-2 rounded-full"
//                                         style={{
//                                           width: `${condition.probability}%`,
//                                         }}
//                                       ></div>
//                                     </div>
//                                     <span className="text-xs text-gray-600">
//                                       {condition.probability}%
//                                     </span>
//                                   </div>
//                                 </div>
//                               )
//                             )}
//                           </div>
//                         )}
//                       </div>
//                     )}

//                     {/* Timestamp */}
//                     <p
//                       className={`text-xs mt-2 ${
//                         message.type === "user"
//                           ? "text-teal-100"
//                           : "text-gray-500"
//                       }`}
//                     >
//                       {formatTime(message.timestamp)}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}

//             {/* Typing Indicator */}
//             {isTyping && (
//               <div className="flex justify-start">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center">
//                     <Bot className="w-5 h-5 text-white" />
//                   </div>
//                   <div className="bg-white shadow-md border border-gray-100 rounded-2xl px-4 py-3">
//                     <div className="flex space-x-1">
//                       <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce"></div>
//                       <div
//                         className="w-2 h-2 bg-teal-600 rounded-full animate-bounce"
//                         style={{ animationDelay: "0.1s" }}
//                       ></div>
//                       <div
//                         className="w-2 h-2 bg-teal-600 rounded-full animate-bounce"
//                         style={{ animationDelay: "0.2s" }}
//                       ></div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//             <div ref={messagesEndRef} />
//           </div>

//           {/* Input */}
//           <div className="p-6 bg-white border-t border-gray-100">
//             <div className="flex items-center space-x-3">
//               {/* Upload */}
//               <button
//                 onClick={() => fileInputRef.current?.click()}
//                 className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full"
//               >
//                 <Upload className="w-5 h-5 text-gray-600" />
//               </button>
//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 onChange={handleFileUpload}
//                 multiple
//                 accept="image/*,.pdf,.doc,.docx"
//                 className="hidden"
//               />

//               {/* Voice */}
//               <button
//                 onClick={handleVoiceToggle}
//                 className={`p-3 rounded-full transition-all ${
//                   isRecording
//                     ? "bg-red-500 hover:bg-red-600 animate-pulse"
//                     : "bg-teal-600 hover:bg-teal-700"
//                 }`}
//               >
//                 {isRecording ? (
//                   <MicOff className="w-5 h-5 text-white" />
//                 ) : (
//                   <Mic className="w-5 h-5 text-white" />
//                 )}
//               </button>

//               {/* Input */}
//               <input
//                 type="text"
//                 value={inputText}
//                 onChange={(e) => setInputText(e.target.value)}
//                 placeholder="Describe your symptoms..."
//                 className="flex-1 px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-teal-500"
//                 onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
//               />

//               {/* Send */}
//               <button
//                 onClick={handleSendMessage}
//                 disabled={inputText.trim() === ""}
//                 className="bg-teal-600 hover:bg-teal-700 disabled:bg-gray-300 p-3 rounded-full"
//               >
//                 <Send className="w-5 h-5 text-white" />
//               </button>
//             </div>
//             <p className="mt-4 text-xs text-gray-500 text-center">
//               ⚠️ This AI provides general info and does not replace professional
//               medical advice.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SymptomChecker;
