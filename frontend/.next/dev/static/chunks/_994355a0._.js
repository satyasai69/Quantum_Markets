(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/auth-button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AuthButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$usePrivy$2d$BSIhOAz8$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__u__as__usePrivy$3e$__ = __turbopack_context__.i("[project]/node_modules/@privy-io/react-auth/dist/esm/usePrivy-BSIhOAz8.mjs [app-client] (ecmascript) <export u as usePrivy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/log-out.js [app-client] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function AuthButton() {
    _s();
    const { login, logout, authenticated, user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$usePrivy$2d$BSIhOAz8$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__u__as__usePrivy$3e$__["usePrivy"])();
    if (authenticated && user) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full border border-border",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                            size: 14,
                            className: "text-muted-foreground"
                        }, void 0, false, {
                            fileName: "[project]/components/auth-button.tsx",
                            lineNumber: 13,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-sm font-medium",
                            children: user.wallet?.address ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    user.wallet.address.slice(0, 6),
                                    "...",
                                    user.wallet.address.slice(-4)
                                ]
                            }, void 0, true) : user.email?.address || "User"
                        }, void 0, false, {
                            fileName: "[project]/components/auth-button.tsx",
                            lineNumber: 14,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/auth-button.tsx",
                    lineNumber: 12,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: logout,
                    className: "p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground",
                    title: "Logout",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                        size: 18
                    }, void 0, false, {
                        fileName: "[project]/components/auth-button.tsx",
                        lineNumber: 29,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/auth-button.tsx",
                    lineNumber: 24,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/auth-button.tsx",
            lineNumber: 11,
            columnNumber: 13
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: login,
        className: "px-4 py-2 bg-muted/50 dark:bg-muted/30 border border-border text-foreground rounded-lg text-sm font-medium hover:bg-muted dark:hover:bg-muted/60 hover:border-border/80 dark:hover:border-border/60 transition-all duration-200",
        children: "Login/SignUp"
    }, void 0, false, {
        fileName: "[project]/components/auth-button.tsx",
        lineNumber: 36,
        columnNumber: 9
    }, this);
}
_s(AuthButton, "qhPnmSjw0cCMCxYOsULqJ6xjWsE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$usePrivy$2d$BSIhOAz8$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__u__as__usePrivy$3e$__["usePrivy"]
    ];
});
_c = AuthButton;
var _c;
__turbopack_context__.k.register(_c, "AuthButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/app-header.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AppHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-themes/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sun.js [app-client] (ecmascript) <export default as Sun>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/moon.js [app-client] (ecmascript) <export default as Moon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bell.js [app-client] (ecmascript) <export default as Bell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/auth-button.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function AppHeader({ title = "Quantum Market", showBackButton = false, onBackClick, userBalance: propUserBalance }) {
    _s();
    const { theme, setTheme, resolvedTheme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    // Use prop if provided, otherwise use default mock balance
    // In a real app, this would come from an API or context
    const [userBalance, setUserBalance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(propUserBalance ?? 1000);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AppHeader.useEffect": ()=>{
            // Update balance if prop changes
            if (propUserBalance !== undefined) {
                setUserBalance(propUserBalance);
            }
        }
    }["AppHeader.useEffect"], [
        propUserBalance
    ]);
    const toggleTheme = ()=>{
        const currentTheme = resolvedTheme || theme || "light";
        setTheme(currentTheme === "dark" ? "light" : "dark");
    };
    const isDark = resolvedTheme === "dark" || theme === "dark";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "sticky top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-md",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `mx-auto px-6 py-3 flex items-center justify-between ${showBackButton ? "max-w-4xl" : "max-w-7xl"}`,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-3",
                    children: [
                        showBackButton && onBackClick && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onBackClick,
                            className: "p-2 hover:bg-muted rounded-lg transition-colors",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                size: 20
                            }, void 0, false, {
                                fileName: "[project]/components/app-header.tsx",
                                lineNumber: 46,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/app-header.tsx",
                            lineNumber: 42,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: "flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: "/logo.jpg",
                                    alt: "Quantum Market",
                                    width: 28,
                                    height: 28,
                                    className: "rounded object-contain",
                                    priority: true
                                }, void 0, false, {
                                    fileName: "[project]/components/app-header.tsx",
                                    lineNumber: 50,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-base font-semibold tracking-tight",
                                    children: title
                                }, void 0, false, {
                                    fileName: "[project]/components/app-header.tsx",
                                    lineNumber: 58,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/app-header.tsx",
                            lineNumber: 49,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/app-header.tsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-0.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground",
                                    title: "Search",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/components/app-header.tsx",
                                        lineNumber: 66,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/app-header.tsx",
                                    lineNumber: 65,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground relative",
                                    title: "Notifications",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                                            size: 18
                                        }, void 0, false, {
                                            fileName: "[project]/components/app-header.tsx",
                                            lineNumber: 69,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "absolute top-1.5 right-1.5 w-2 h-2 bg-foreground rounded-full animate-pulse"
                                        }, void 0, false, {
                                            fileName: "[project]/components/app-header.tsx",
                                            lineNumber: 70,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/app-header.tsx",
                                    lineNumber: 68,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: toggleTheme,
                                    className: "p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground",
                                    title: isDark ? "Switch to light mode" : "Switch to dark mode",
                                    children: isDark ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__["Sun"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/components/app-header.tsx",
                                        lineNumber: 77,
                                        columnNumber: 25
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__["Moon"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/components/app-header.tsx",
                                        lineNumber: 77,
                                        columnNumber: 45
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/app-header.tsx",
                                    lineNumber: 72,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/app-header.tsx",
                            lineNumber: 64,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 pl-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 px-3 py-1.5 rounded-md bg-muted/50 border border-border/50",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs font-medium text-muted-foreground",
                                            children: "Balance"
                                        }, void 0, false, {
                                            fileName: "[project]/components/app-header.tsx",
                                            lineNumber: 85,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm font-semibold font-mono text-foreground",
                                            children: [
                                                "$",
                                                userBalance.toFixed(2)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/app-header.tsx",
                                            lineNumber: 86,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/app-header.tsx",
                                    lineNumber: 84,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                    fileName: "[project]/components/app-header.tsx",
                                    lineNumber: 88,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/app-header.tsx",
                            lineNumber: 82,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/app-header.tsx",
                    lineNumber: 62,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/app-header.tsx",
            lineNumber: 39,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/app-header.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_s(AppHeader, "ujfMRs84olSdsN8O1hI8C8seJ+4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"]
    ];
});
_c = AppHeader;
var _c;
__turbopack_context__.k.register(_c, "AppHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/chart.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChartContainer",
    ()=>ChartContainer,
    "ChartLegend",
    ()=>ChartLegend,
    "ChartLegendContent",
    ()=>ChartLegendContent,
    "ChartStyle",
    ()=>ChartStyle,
    "ChartTooltip",
    ()=>ChartTooltip,
    "ChartTooltipContent",
    ()=>ChartTooltipContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Legend.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
'use client';
;
;
;
// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = {
    light: '',
    dark: '.dark'
};
const ChartContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"](null);
function useChart() {
    _s();
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](ChartContext);
    if (!context) {
        throw new Error('useChart must be used within a <ChartContainer />');
    }
    return context;
}
_s(useChart, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
function ChartContainer({ id, className, children, config, ...props }) {
    _s1();
    const uniqueId = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"]();
    const chartId = `chart-${id || uniqueId.replace(/:/g, '')}`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChartContext.Provider, {
        value: {
            config
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            "data-slot": "chart",
            "data-chart": chartId,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border flex aspect-video justify-center text-xs [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden", className),
            ...props,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChartStyle, {
                    id: chartId,
                    config: config
                }, void 0, false, {
                    fileName: "[project]/components/ui/chart.tsx",
                    lineNumber: 63,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                    children: children
                }, void 0, false, {
                    fileName: "[project]/components/ui/chart.tsx",
                    lineNumber: 64,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/ui/chart.tsx",
            lineNumber: 54,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/chart.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
_s1(ChartContainer, "j7NPILheLIfrWAvm8S/GM4Sml/8=");
_c = ChartContainer;
const ChartStyle = ({ id, config })=>{
    const colorConfig = Object.entries(config).filter(([, config])=>config.theme || config.color);
    if (!colorConfig.length) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
        dangerouslySetInnerHTML: {
            __html: Object.entries(THEMES).map(([theme, prefix])=>`
${prefix} [data-chart=${id}] {
${colorConfig.map(([key, itemConfig])=>{
                    const color = itemConfig.theme?.[theme] || itemConfig.color;
                    return color ? `  --color-${key}: ${color};` : null;
                }).join('\n')}
}
`).join('\n')
        }
    }, void 0, false, {
        fileName: "[project]/components/ui/chart.tsx",
        lineNumber: 82,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c1 = ChartStyle;
const ChartTooltip = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"];
function ChartTooltipContent({ active, payload, className, indicator = 'dot', hideLabel = false, hideIndicator = false, label, labelFormatter, labelClassName, formatter, color, nameKey, labelKey }) {
    _s2();
    const { config } = useChart();
    const tooltipLabel = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "ChartTooltipContent.useMemo[tooltipLabel]": ()=>{
            if (hideLabel || !payload?.length) {
                return null;
            }
            const [item] = payload;
            const key = `${labelKey || item?.dataKey || item?.name || 'value'}`;
            const itemConfig = getPayloadConfigFromPayload(config, item, key);
            const value = !labelKey && typeof label === 'string' ? config[label]?.label || label : itemConfig?.label;
            if (labelFormatter) {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('font-medium', labelClassName),
                    children: labelFormatter(value, payload)
                }, void 0, false, {
                    fileName: "[project]/components/ui/chart.tsx",
                    lineNumber: 146,
                    columnNumber: 9
                }, this);
            }
            if (!value) {
                return null;
            }
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('font-medium', labelClassName),
                children: value
            }, void 0, false, {
                fileName: "[project]/components/ui/chart.tsx",
                lineNumber: 156,
                columnNumber: 12
            }, this);
        }
    }["ChartTooltipContent.useMemo[tooltipLabel]"], [
        label,
        labelFormatter,
        payload,
        hideLabel,
        labelClassName,
        config,
        labelKey
    ]);
    if (!active || !payload?.length) {
        return null;
    }
    const nestLabel = payload.length === 1 && indicator !== 'dot';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl', className),
        children: [
            !nestLabel ? tooltipLabel : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-1.5",
                children: payload.map((item, index)=>{
                    const key = `${nameKey || item.name || item.dataKey || 'value'}`;
                    const itemConfig = getPayloadConfigFromPayload(config, item, key);
                    const indicatorColor = color || item.payload.fill || item.color;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5', indicator === 'dot' && 'items-center'),
                        children: formatter && item?.value !== undefined && item.name ? formatter(item.value, item.name, item, index, item.payload) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                itemConfig?.icon ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(itemConfig.icon, {}, void 0, false, {
                                    fileName: "[project]/components/ui/chart.tsx",
                                    lineNumber: 200,
                                    columnNumber: 21
                                }, this) : !hideIndicator && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)', {
                                        'h-2.5 w-2.5': indicator === 'dot',
                                        'w-1': indicator === 'line',
                                        'w-0 border-[1.5px] border-dashed bg-transparent': indicator === 'dashed',
                                        'my-0.5': nestLabel && indicator === 'dashed'
                                    }),
                                    style: {
                                        '--color-bg': indicatorColor,
                                        '--color-border': indicatorColor
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/ui/chart.tsx",
                                    lineNumber: 203,
                                    columnNumber: 23
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex flex-1 justify-between leading-none', nestLabel ? 'items-end' : 'items-center'),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid gap-1.5",
                                            children: [
                                                nestLabel ? tooltipLabel : null,
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-muted-foreground",
                                                    children: itemConfig?.label || item.name
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ui/chart.tsx",
                                                    lineNumber: 231,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/ui/chart.tsx",
                                            lineNumber: 229,
                                            columnNumber: 21
                                        }, this),
                                        item.value && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-foreground font-mono font-medium tabular-nums",
                                            children: item.value.toLocaleString()
                                        }, void 0, false, {
                                            fileName: "[project]/components/ui/chart.tsx",
                                            lineNumber: 236,
                                            columnNumber: 23
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/ui/chart.tsx",
                                    lineNumber: 223,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true)
                    }, item.dataKey, false, {
                        fileName: "[project]/components/ui/chart.tsx",
                        lineNumber: 188,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/ui/chart.tsx",
                lineNumber: 181,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/chart.tsx",
        lineNumber: 174,
        columnNumber: 5
    }, this);
}
_s2(ChartTooltipContent, "nRMgiGinpZEd+NE7/dAtqF0Z2iA=", false, function() {
    return [
        useChart
    ];
});
_c2 = ChartTooltipContent;
const ChartLegend = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Legend"];
function ChartLegendContent({ className, hideIcon = false, payload, verticalAlign = 'bottom', nameKey }) {
    _s3();
    const { config } = useChart();
    if (!payload?.length) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex items-center justify-center gap-4', verticalAlign === 'top' ? 'pb-3' : 'pt-3', className),
        children: payload.map((item)=>{
            const key = `${nameKey || item.dataKey || 'value'}`;
            const itemConfig = getPayloadConfigFromPayload(config, item, key);
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: '[&>svg]:text-muted-foreground flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3',
                children: [
                    itemConfig?.icon && !hideIcon ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(itemConfig.icon, {}, void 0, false, {
                        fileName: "[project]/components/ui/chart.tsx",
                        lineNumber: 290,
                        columnNumber: 15
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-2 w-2 shrink-0 rounded-[2px]",
                        style: {
                            backgroundColor: item.color
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/ui/chart.tsx",
                        lineNumber: 292,
                        columnNumber: 15
                    }, this),
                    itemConfig?.label
                ]
            }, item.value, true, {
                fileName: "[project]/components/ui/chart.tsx",
                lineNumber: 283,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/components/ui/chart.tsx",
        lineNumber: 271,
        columnNumber: 5
    }, this);
}
_s3(ChartLegendContent, "qnidj+dVqj1Euuv2nRBc6D+LeAA=", false, function() {
    return [
        useChart
    ];
});
_c3 = ChartLegendContent;
// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(config, payload, key) {
    if (typeof payload !== 'object' || payload === null) {
        return undefined;
    }
    const payloadPayload = 'payload' in payload && typeof payload.payload === 'object' && payload.payload !== null ? payload.payload : undefined;
    let configLabelKey = key;
    if (key in payload && typeof payload[key] === 'string') {
        configLabelKey = payload[key];
    } else if (payloadPayload && key in payloadPayload && typeof payloadPayload[key] === 'string') {
        configLabelKey = payloadPayload[key];
    }
    return configLabelKey in config ? config[configLabelKey] : config[key];
}
;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "ChartContainer");
__turbopack_context__.k.register(_c1, "ChartStyle");
__turbopack_context__.k.register(_c2, "ChartTooltipContent");
__turbopack_context__.k.register(_c3, "ChartLegendContent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/price-chart.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PriceChart,
    "generateMockPriceData",
    ()=>generateMockPriceData
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/LineChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Line.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/YAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Legend.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$chart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/chart.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function generateMockPriceData(options, timePeriod = "1M") {
    const data = [];
    const totalPool = options.reduce((sum, opt)=>sum + opt.amountBet, 0);
    // Current probabilities
    const currentProbs = options.map((opt)=>opt.amountBet / totalPool * 100);
    // Determine number of data points and interval based on time period
    let totalPoints;
    let intervalMinutes;
    switch(timePeriod){
        case "1H":
            totalPoints = 12; // 1 point per 5 minutes (12 points = 60 minutes)
            intervalMinutes = 5;
            break;
        case "1D":
            totalPoints = 24; // 1 point per hour
            intervalMinutes = 60;
            break;
        case "1W":
            totalPoints = 7; // 1 point per day
            intervalMinutes = 24 * 60;
            break;
        case "1M":
            totalPoints = 30; // 1 point per day
            intervalMinutes = 24 * 60;
            break;
        default:
            totalPoints = 30;
            intervalMinutes = 24 * 60;
    }
    for(let i = totalPoints; i >= 0; i--){
        const date = new Date();
        date.setMinutes(date.getMinutes() - i * intervalMinutes);
        // Format time label based on time period
        let timeLabel;
        if (i === 0) {
            timeLabel = "Now";
        } else {
            switch(timePeriod){
                case "1H":
                    // Show minutes ago or time
                    if (i === totalPoints) {
                        timeLabel = `${totalPoints * 5}m ago`;
                    } else {
                        const hours = date.getHours();
                        const minutes = date.getMinutes();
                        timeLabel = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
                    }
                    break;
                case "1D":
                    // Show hours ago or time
                    if (i === totalPoints) {
                        timeLabel = `${totalPoints}h ago`;
                    } else {
                        const hours = date.getHours();
                        const minutes = date.getMinutes();
                        timeLabel = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
                    }
                    break;
                case "1W":
                    // Show day name or date
                    if (i === totalPoints) {
                        timeLabel = `${totalPoints}d ago`;
                    } else {
                        const dayName = date.toLocaleDateString("en-US", {
                            weekday: "short"
                        });
                        timeLabel = dayName;
                    }
                    break;
                case "1M":
                    // Show date
                    if (i === totalPoints) {
                        timeLabel = `${totalPoints}d ago`;
                    } else if (i <= 7) {
                        timeLabel = `${i}d ago`;
                    } else {
                        const month = date.toLocaleDateString("en-US", {
                            month: "short"
                        });
                        const day = date.getDate();
                        timeLabel = `${month} ${day}`;
                    }
                    break;
                default:
                    timeLabel = `${i}d ago`;
            }
        }
        const point = {
            time: timeLabel
        };
        // Generate price data with some variation (simulating market movement)
        options.forEach((option, idx)=>{
            const baseProb = currentProbs[idx];
            // Add some random variation that decreases as we go back in time
            // More variation in recent periods, less in past
            const variation = (Math.random() - 0.5) * 15 * (1 - i / totalPoints);
            const yesPrice = Math.max(5, Math.min(95, baseProb + variation));
            // Store Yes price (No price is always 100 - Yes)
            point[option.name] = Number(yesPrice.toFixed(1));
        });
        data.push(point);
    }
    return data;
}
const colors = [
    "#10b981",
    "#3b82f6",
    "#8b5cf6",
    "#f59e0b",
    "#ec4899",
    "#06b6d4"
];
function PriceChart({ options, data: initialData }) {
    _s();
    const [timePeriod, setTimePeriod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("1M");
    // Generate data based on selected time period
    const chartData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PriceChart.useMemo[chartData]": ()=>{
            return generateMockPriceData(options, timePeriod);
        }
    }["PriceChart.useMemo[chartData]"], [
        options,
        timePeriod
    ]);
    const chartConfig = {};
    options.forEach((option, idx)=>{
        chartConfig[option.name] = {
            label: option.name,
            color: colors[idx % colors.length]
        };
    });
    const timePeriods = [
        {
            value: "1H",
            label: "1 Hour"
        },
        {
            value: "1D",
            label: "1 Day"
        },
        {
            value: "1W",
            label: "1 Week"
        },
        {
            value: "1M",
            label: "1 Month"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full h-[450px] p-6 rounded-lg border border-border bg-background",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-semibold mb-1",
                                children: "Price History"
                            }, void 0, false, {
                                fileName: "[project]/components/price-chart.tsx",
                                lineNumber: 169,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-muted-foreground",
                                children: "Track price movements over time (in cents)"
                            }, void 0, false, {
                                fileName: "[project]/components/price-chart.tsx",
                                lineNumber: 170,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/price-chart.tsx",
                        lineNumber: 168,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2",
                        children: timePeriods.map((period)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setTimePeriod(period.value),
                                className: `px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all duration-200 ${timePeriod === period.value ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`,
                                children: period.label
                            }, period.value, false, {
                                fileName: "[project]/components/price-chart.tsx",
                                lineNumber: 174,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/price-chart.tsx",
                        lineNumber: 172,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/price-chart.tsx",
                lineNumber: 167,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$chart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChartContainer"], {
                config: chartConfig,
                className: "h-[320px]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineChart"], {
                    data: chartData,
                    margin: {
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                            strokeDasharray: "3 3",
                            className: "stroke-muted"
                        }, void 0, false, {
                            fileName: "[project]/components/price-chart.tsx",
                            lineNumber: 190,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                            dataKey: "time",
                            className: "text-xs",
                            tick: {
                                fill: "currentColor"
                            },
                            interval: "preserveStartEnd",
                            angle: timePeriod === "1D" || timePeriod === "1H" ? -45 : 0,
                            textAnchor: timePeriod === "1D" || timePeriod === "1H" ? "end" : "middle",
                            height: timePeriod === "1D" || timePeriod === "1H" ? 60 : 30
                        }, void 0, false, {
                            fileName: "[project]/components/price-chart.tsx",
                            lineNumber: 191,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                            domain: [
                                0,
                                100
                            ],
                            className: "text-xs",
                            tick: {
                                fill: "currentColor"
                            },
                            label: {
                                value: "Price (¢)",
                                angle: -90,
                                position: "insideLeft"
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/price-chart.tsx",
                            lineNumber: 200,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$chart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChartTooltip"], {
                            content: ({ active, payload })=>{
                                if (!active || !payload?.length) return null;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-lg border bg-background p-3 shadow-lg",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid gap-2",
                                        children: payload.map((entry, idx)=>{
                                            const yesPrice = typeof entry.value === "number" ? entry.value : 0;
                                            const noPrice = 100 - yesPrice;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2 mb-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "h-2.5 w-2.5 rounded-full",
                                                                style: {
                                                                    backgroundColor: entry.color
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/price-chart.tsx",
                                                                lineNumber: 219,
                                                                columnNumber: 29
                                                            }, void 0),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs font-semibold",
                                                                children: entry.dataKey?.toString()
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/price-chart.tsx",
                                                                lineNumber: 223,
                                                                columnNumber: 29
                                                            }, void 0)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/price-chart.tsx",
                                                        lineNumber: 218,
                                                        columnNumber: 27
                                                    }, void 0),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between gap-4 pl-7",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs text-muted-foreground",
                                                                children: "Yes:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/price-chart.tsx",
                                                                lineNumber: 228,
                                                                columnNumber: 29
                                                            }, void 0),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs font-mono font-semibold text-green-600 dark:text-green-400",
                                                                children: [
                                                                    yesPrice.toFixed(1),
                                                                    "¢"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/price-chart.tsx",
                                                                lineNumber: 229,
                                                                columnNumber: 29
                                                            }, void 0)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/price-chart.tsx",
                                                        lineNumber: 227,
                                                        columnNumber: 27
                                                    }, void 0),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between gap-4 pl-7",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs text-muted-foreground",
                                                                children: "No:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/price-chart.tsx",
                                                                lineNumber: 234,
                                                                columnNumber: 29
                                                            }, void 0),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs font-mono font-semibold text-red-600 dark:text-red-400",
                                                                children: [
                                                                    noPrice.toFixed(1),
                                                                    "¢"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/price-chart.tsx",
                                                                lineNumber: 235,
                                                                columnNumber: 29
                                                            }, void 0)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/price-chart.tsx",
                                                        lineNumber: 233,
                                                        columnNumber: 27
                                                    }, void 0)
                                                ]
                                            }, idx, true, {
                                                fileName: "[project]/components/price-chart.tsx",
                                                lineNumber: 217,
                                                columnNumber: 25
                                            }, void 0);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/components/price-chart.tsx",
                                        lineNumber: 212,
                                        columnNumber: 19
                                    }, void 0)
                                }, void 0, false, {
                                    fileName: "[project]/components/price-chart.tsx",
                                    lineNumber: 211,
                                    columnNumber: 17
                                }, void 0);
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/price-chart.tsx",
                            lineNumber: 206,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Legend"], {
                            wrapperStyle: {
                                paddingTop: "20px"
                            },
                            iconType: "line"
                        }, void 0, false, {
                            fileName: "[project]/components/price-chart.tsx",
                            lineNumber: 247,
                            columnNumber: 11
                        }, this),
                        options.map((option, idx)=>{
                            const color = colors[idx % colors.length];
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"], {
                                type: "monotone",
                                dataKey: option.name,
                                stroke: color,
                                strokeWidth: 2.5,
                                dot: false,
                                activeDot: {
                                    r: 5,
                                    fill: color
                                }
                            }, option.name, false, {
                                fileName: "[project]/components/price-chart.tsx",
                                lineNumber: 254,
                                columnNumber: 15
                            }, this);
                        })
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/price-chart.tsx",
                    lineNumber: 189,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/price-chart.tsx",
                lineNumber: 188,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/price-chart.tsx",
        lineNumber: 166,
        columnNumber: 5
    }, this);
}
_s(PriceChart, "Mldlukvj73VbWuG2/mD0w8M4C7w=");
_c = PriceChart;
var _c;
__turbopack_context__.k.register(_c, "PriceChart");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/dialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Dialog",
    ()=>Dialog,
    "DialogClose",
    ()=>DialogClose,
    "DialogContent",
    ()=>DialogContent,
    "DialogDescription",
    ()=>DialogDescription,
    "DialogFooter",
    ()=>DialogFooter,
    "DialogHeader",
    ()=>DialogHeader,
    "DialogOverlay",
    ()=>DialogOverlay,
    "DialogPortal",
    ()=>DialogPortal,
    "DialogTitle",
    ()=>DialogTitle,
    "DialogTrigger",
    ()=>DialogTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-dialog/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as XIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
'use client';
;
;
;
;
function Dialog({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "dialog",
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dialog.tsx",
        lineNumber: 12,
        columnNumber: 10
    }, this);
}
_c = Dialog;
function DialogTrigger({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "dialog-trigger",
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dialog.tsx",
        lineNumber: 18,
        columnNumber: 10
    }, this);
}
_c1 = DialogTrigger;
function DialogPortal({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
        "data-slot": "dialog-portal",
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dialog.tsx",
        lineNumber: 24,
        columnNumber: 10
    }, this);
}
_c2 = DialogPortal;
function DialogClose({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"], {
        "data-slot": "dialog-close",
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dialog.tsx",
        lineNumber: 30,
        columnNumber: 10
    }, this);
}
_c3 = DialogClose;
function DialogOverlay({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Overlay"], {
        "data-slot": "dialog-overlay",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dialog.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_c4 = DialogOverlay;
function DialogContent({ className, children, showCloseButton = true, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogPortal, {
        "data-slot": "dialog-portal",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogOverlay, {}, void 0, false, {
                fileName: "[project]/components/ui/dialog.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
                "data-slot": "dialog-content",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg', className),
                ...props,
                children: [
                    children,
                    showCloseButton && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"], {
                        "data-slot": "dialog-close",
                        className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__["XIcon"], {}, void 0, false, {
                                fileName: "[project]/components/ui/dialog.tsx",
                                lineNumber: 74,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "sr-only",
                                children: "Close"
                            }, void 0, false, {
                                fileName: "[project]/components/ui/dialog.tsx",
                                lineNumber: 75,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ui/dialog.tsx",
                        lineNumber: 70,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/dialog.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/dialog.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
_c5 = DialogContent;
function DialogHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "dialog-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex flex-col gap-2 text-center sm:text-left', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dialog.tsx",
        lineNumber: 85,
        columnNumber: 5
    }, this);
}
_c6 = DialogHeader;
function DialogFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "dialog-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dialog.tsx",
        lineNumber: 95,
        columnNumber: 5
    }, this);
}
_c7 = DialogFooter;
function DialogTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Title"], {
        "data-slot": "dialog-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-lg leading-none font-semibold', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dialog.tsx",
        lineNumber: 111,
        columnNumber: 5
    }, this);
}
_c8 = DialogTitle;
function DialogDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Description"], {
        "data-slot": "dialog-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-muted-foreground text-sm', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dialog.tsx",
        lineNumber: 124,
        columnNumber: 5
    }, this);
}
_c9 = DialogDescription;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9;
__turbopack_context__.k.register(_c, "Dialog");
__turbopack_context__.k.register(_c1, "DialogTrigger");
__turbopack_context__.k.register(_c2, "DialogPortal");
__turbopack_context__.k.register(_c3, "DialogClose");
__turbopack_context__.k.register(_c4, "DialogOverlay");
__turbopack_context__.k.register(_c5, "DialogContent");
__turbopack_context__.k.register(_c6, "DialogHeader");
__turbopack_context__.k.register(_c7, "DialogFooter");
__turbopack_context__.k.register(_c8, "DialogTitle");
__turbopack_context__.k.register(_c9, "DialogDescription");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/market/[id]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MarketDetailPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-client] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/external-link.js [app-client] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2d$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/app-header.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$price$2d$chart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/price-chart.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-toast.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$useWallets$2d$DuxHKVvE$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__u__as__useWallets$3e$__ = __turbopack_context__.i("[project]/node_modules/@privy-io/react-auth/dist/esm/useWallets-DuxHKVvE.mjs [app-client] (ecmascript) <export u as useWallets>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$usePrivy$2d$BSIhOAz8$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__u__as__usePrivy$3e$__ = __turbopack_context__.i("[project]/node_modules/@privy-io/react-auth/dist/esm/usePrivy-BSIhOAz8.mjs [app-client] (ecmascript) <export u as usePrivy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$createWalletClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/clients/createWalletClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$custom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/clients/transports/custom.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/unit/parseEther.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$getAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/address/getAddress.js [app-client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '@/config/contracts'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/dialog.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
// Market data - in a real app, this would come from an API
const markets = [
    {
        id: 1,
        question: "Which AI model will dominate in 2026?",
        category: "Technology",
        options: [
            {
                name: "GPT-5",
                amountBet: 234000000
            },
            {
                name: "Claude-4",
                amountBet: 182000000
            },
            {
                name: "Gemini-X",
                amountBet: 104000000
            }
        ],
        volume: "$520M",
        traders: "12.5K",
        timeLeft: "45 days",
        trend: 12
    },
    {
        id: 2,
        question: "Bitcoin price by end of 2025?",
        category: "Crypto",
        options: [
            {
                name: "$150k+",
                amountBet: 315000000
            },
            {
                name: "$100-150k",
                amountBet: 285000000
            },
            {
                name: "$50-100k",
                amountBet: 150000000
            }
        ],
        volume: "$750M",
        traders: "28.9K",
        timeLeft: "25 days",
        trend: 8
    },
    {
        id: 3,
        question: "Will there be a US recession in 2025?",
        category: "Economics",
        options: [
            {
                name: "Yes",
                amountBet: 234345000
            },
            {
                name: "No",
                amountBet: 286655000
            }
        ],
        volume: "$521M",
        traders: "14.5K",
        timeLeft: "60 days",
        trend: -3
    },
    {
        id: 4,
        question: "Will Apple release AR glasses in 2025?",
        category: "Technology",
        options: [
            {
                name: "Yes",
                amountBet: 284920000
            },
            {
                name: "Maybe",
                amountBet: 100560000
            },
            {
                name: "No",
                amountBet: 33520000
            }
        ],
        volume: "$419M",
        traders: "9.8K",
        timeLeft: "38 days",
        trend: 5
    },
    {
        id: 5,
        question: "Which team will win Super Bowl LIX?",
        category: "Sports",
        options: [
            {
                name: "Kansas City Chiefs",
                amountBet: 284640000
            },
            {
                name: "Buffalo Bills",
                amountBet: 160200000
            },
            {
                name: "San Francisco 49ers",
                amountBet: 195800000
            },
            {
                name: "Other",
                amountBet: 249360000
            }
        ],
        volume: "$890M",
        traders: "42.3K",
        timeLeft: "12 days",
        trend: 15
    },
    {
        id: 6,
        question: "Will Tesla stock reach $300 by 2026?",
        category: "Stocks",
        options: [
            {
                name: "Yes",
                amountBet: 144400000
            },
            {
                name: "No",
                amountBet: 235600000
            }
        ],
        volume: "$380M",
        traders: "7.2K",
        timeLeft: "90 days",
        trend: -2
    }
];
// Helper function to load from localStorage synchronously
function loadFromLocalStorage(key, defaultValue) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const saved = localStorage.getItem(key);
        if (saved === null) return defaultValue;
        if (typeof defaultValue === "number") {
            return Number.parseFloat(saved);
        }
        if (typeof defaultValue === "object" && defaultValue !== null) {
            return JSON.parse(saved);
        }
        return saved;
    } catch (e) {
        console.error(`Error loading ${key} from localStorage:`, e);
        return defaultValue;
    }
}
function MarketDetailPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const marketId = Number.parseInt(params?.id);
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const { wallets } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$useWallets$2d$DuxHKVvE$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__u__as__useWallets$3e$__["useWallets"])();
    const { authenticated } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$usePrivy$2d$BSIhOAz8$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__u__as__usePrivy$3e$__["usePrivy"])();
    // Get the connected wallet (prefer external wallet like MetaMask)
    const wallet = wallets.find((w)=>w.walletClientType === "metamask") || wallets[0];
    const [depositDialogOpen, setDepositDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isProcessingTransaction, setIsProcessingTransaction] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [depositAmount, setDepositAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    // Load initial state from localStorage synchronously to prevent reset on remount
    const [userBalance, setUserBalance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "MarketDetailPage.useState": ()=>loadFromLocalStorage("userBalance", 1000)
    }["MarketDetailPage.useState"]);
    const [tradingBalance, setTradingBalance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "MarketDetailPage.useState": ()=>loadFromLocalStorage(`tradingBalance_${marketId}`, 0)
    }["MarketDetailPage.useState"]);
    const [allocations, setAllocations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "MarketDetailPage.useState": ()=>loadFromLocalStorage(`allocations_${marketId}`, {})
    }["MarketDetailPage.useState"]);
    const [placedAllocations, setPlacedAllocations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "MarketDetailPage.useState": ()=>{
            const saved = loadFromLocalStorage(`placedAllocations_${marketId}`, []);
            return new Set(saved);
        }
    }["MarketDetailPage.useState"]);
    const [boughtPositions, setBoughtPositions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "MarketDetailPage.useState": ()=>{
            const saved = loadFromLocalStorage(`boughtPositions_${marketId}`, []);
            return saved || [];
        }
    }["MarketDetailPage.useState"]);
    const [editDialogOpen, setEditDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editAmount, setEditAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [clearConfirmDialogOpen, setClearConfirmDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [transactions, setTransactions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "MarketDetailPage.useState": ()=>{
            if ("TURBOPACK compile-time truthy", 1) {
                const saved = localStorage.getItem("transactions");
                return saved ? JSON.parse(saved) : [];
            }
            //TURBOPACK unreachable
            ;
        }
    }["MarketDetailPage.useState"]);
    const market = markets.find((m)=>m.id === marketId);
    // Function to send a real blockchain transaction
    const sendBlockchainTransaction = async (amount, transactionType, transactionData)=>{
        if (!authenticated || !wallet) {
            toast({
                title: "Wallet Not Connected",
                description: "Please connect your MetaMask wallet to proceed.",
                variant: "destructive"
            });
            return null;
        }
        try {
            setIsProcessingTransaction(true);
            // Switch wallet to Flare Coston2 network if needed
            try {
                await wallet.switchChain(114); // Flare Coston2 Testnet chain ID
            } catch (switchError) {
                // If chain switch fails, user might need to add the network manually
                console.warn("Chain switch failed, continuing anyway:", switchError);
            }
            // Get the Ethereum provider from Privy wallet
            const provider = await wallet.getEthereumProvider();
            // Create Viem wallet client using the provider
            const walletClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$createWalletClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createWalletClient"])({
                account: wallet.address,
                chain: {
                    id: 114,
                    name: "Flare Testnet Coston2",
                    network: "flare-coston2",
                    nativeCurrency: {
                        decimals: 18,
                        name: "Flare",
                        symbol: "FLR"
                    },
                    rpcUrls: {
                        default: {
                            http: [
                                "https://coston2-api.flare.network/ext/C/rpc"
                            ]
                        }
                    },
                    blockExplorers: {
                        default: {
                            name: "Flare Explorer",
                            url: "https://coston2-explorer.flare.network"
                        }
                    },
                    testnet: true
                },
                transport: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$custom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["custom"])(provider)
            });
            // Convert amount to wei (using native FLR token with 18 decimals)
            // For USDC or other tokens, you'd need to use the token's decimals
            const amountInWei = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseEther"])(amount.toString());
            // Use the Market contract address for prediction market transactions
            // getAddress validates and checksums the address
            const recipientAddress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$getAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(CONTRACTS.MARKET);
            // Send transaction using Viem wallet client
            // This will trigger MetaMask to show the transaction
            const txHash = await walletClient.sendTransaction({
                to: recipientAddress,
                value: amountInWei
            });
            return txHash;
        } catch (error) {
            console.error("Transaction error:", error);
            // Check if user rejected the transaction
            if (error?.code === 4001 || error?.message?.includes("rejected") || error?.message?.includes("denied") || error?.code === "ACTION_REJECTED") {
                toast({
                    title: "Transaction Rejected",
                    description: "You rejected the transaction in MetaMask.",
                    variant: "destructive"
                });
            } else {
                toast({
                    title: "Transaction Failed",
                    description: error?.message || "Failed to send transaction. Please try again.",
                    variant: "destructive"
                });
            }
            return null;
        } finally{
            setIsProcessingTransaction(false);
        }
    };
    // Function to record a transaction (now with real blockchain integration)
    const recordTransaction = async (transaction)=>{
        // Send real blockchain transaction
        const txHash = await sendBlockchainTransaction(transaction.amount, transaction.type, {
            optionName: transaction.optionName,
            selection: transaction.selection,
            buySellMode: transaction.buySellMode
        });
        if (!txHash) {
            // Transaction failed or was rejected
            return null;
        }
        const newTransaction = {
            ...transaction,
            id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            timestamp: Date.now(),
            status: "completed",
            txHash: txHash
        };
        setTransactions((prev)=>{
            const updated = [
                newTransaction,
                ...prev
            ];
            // Save to localStorage
            if ("TURBOPACK compile-time truthy", 1) {
                try {
                    localStorage.setItem("transactions", JSON.stringify(updated));
                } catch (e) {
                    console.error("Error saving transactions:", e);
                }
            }
            return updated;
        });
        // Show success toast notification
        if (transaction.type === "deposit") {
            toast({
                title: "Deposit Successful",
                description: `Successfully deposited $${transaction.amount.toFixed(2)} for this market. Transaction: ${txHash.slice(0, 10)}...`,
                variant: "default"
            });
        } else {
            const actionText = transaction.buySellMode === "sell" ? "Sell" : "Buy";
            toast({
                title: "Transaction Successful",
                description: `${actionText} bet of $${transaction.amount.toFixed(2)} placed for ${transaction.optionName} (${transaction.selection?.toUpperCase()}). Transaction: ${txHash.slice(0, 10)}...`,
                variant: "default"
            });
        }
        // Log transaction for debugging
        console.log("Transaction recorded:", newTransaction);
        return newTransaction;
    };
    // Persist state to localStorage whenever it changes (with debounce to avoid excessive writes)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MarketDetailPage.useEffect": ()=>{
            if (("TURBOPACK compile-time value", "object") !== "undefined" && userBalance !== undefined) {
                try {
                    localStorage.setItem("userBalance", userBalance.toString());
                } catch (e) {
                    console.error("Error saving userBalance to localStorage:", e);
                }
            }
        }
    }["MarketDetailPage.useEffect"], [
        userBalance
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MarketDetailPage.useEffect": ()=>{
            if (("TURBOPACK compile-time value", "object") !== "undefined" && tradingBalance !== undefined) {
                try {
                    localStorage.setItem(`tradingBalance_${marketId}`, tradingBalance.toString());
                } catch (e) {
                    console.error("Error saving tradingBalance to localStorage:", e);
                }
            }
        }
    }["MarketDetailPage.useEffect"], [
        tradingBalance,
        marketId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MarketDetailPage.useEffect": ()=>{
            if (("TURBOPACK compile-time value", "object") !== "undefined" && allocations && Object.keys(allocations).length >= 0) {
                try {
                    localStorage.setItem(`allocations_${marketId}`, JSON.stringify(allocations));
                } catch (e) {
                    console.error("Error saving allocations to localStorage:", e);
                }
            }
        }
    }["MarketDetailPage.useEffect"], [
        allocations,
        marketId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MarketDetailPage.useEffect": ()=>{
            if (("TURBOPACK compile-time value", "object") !== "undefined" && placedAllocations) {
                try {
                    localStorage.setItem(`placedAllocations_${marketId}`, JSON.stringify(Array.from(placedAllocations)));
                } catch (e) {
                    console.error("Error saving placedAllocations to localStorage:", e);
                }
            }
        }
    }["MarketDetailPage.useEffect"], [
        placedAllocations,
        marketId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MarketDetailPage.useEffect": ()=>{
            if (("TURBOPACK compile-time value", "object") !== "undefined" && boughtPositions) {
                try {
                    localStorage.setItem(`boughtPositions_${marketId}`, JSON.stringify(boughtPositions));
                } catch (e) {
                    console.error("Error saving boughtPositions to localStorage:", e);
                }
            }
        }
    }["MarketDetailPage.useEffect"], [
        boughtPositions,
        marketId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MarketDetailPage.useEffect": ()=>{
            // Initialize allocations for all options
            if (market) {
                const initialAllocations = {};
                market.options.forEach({
                    "MarketDetailPage.useEffect": (_, idx)=>{
                        if (!allocations[idx]) {
                            initialAllocations[idx] = {
                                optionIndex: idx,
                                selection: null,
                                amount: 0,
                                buySellMode: "buy"
                            };
                        }
                    }
                }["MarketDetailPage.useEffect"]);
                if (Object.keys(initialAllocations).length > 0) {
                    setAllocations({
                        "MarketDetailPage.useEffect": (prev)=>({
                                ...prev,
                                ...initialAllocations
                            })
                    }["MarketDetailPage.useEffect"]);
                }
            }
        }
    }["MarketDetailPage.useEffect"], [
        market
    ]);
    // VUSDC is now calculated directly as tradingBalance - allocation amount
    // No need for separate state, calculated on the fly
    if (!market) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-background text-foreground flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted-foreground mb-4",
                        children: "Market not found"
                    }, void 0, false, {
                        fileName: "[project]/app/market/[id]/page.tsx",
                        lineNumber: 454,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>router.push("/"),
                        className: "px-4 py-2 rounded-lg bg-foreground text-background hover:opacity-90",
                        children: "Go Back"
                    }, void 0, false, {
                        fileName: "[project]/app/market/[id]/page.tsx",
                        lineNumber: 455,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/market/[id]/page.tsx",
                lineNumber: 453,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/market/[id]/page.tsx",
            lineNumber: 452,
            columnNumber: 7
        }, this);
    }
    const parseVolume = (volumeStr)=>{
        const match = volumeStr.match(/\$?([\d.]+)([MBK])?/i);
        if (!match) return 0;
        const value = parseFloat(match[1]);
        const suffix = match[2]?.toUpperCase();
        if (suffix === "B") return value * 1000000000;
        if (suffix === "M") return value * 1000000;
        if (suffix === "K") return value * 1000;
        return value;
    };
    const formatCurrency = (value)=>{
        if (value >= 1000000000) {
            return `$${(value / 1000000000).toFixed(2)}B`;
        } else if (value >= 1000000) {
            return `$${(value / 1000000).toFixed(2)}M`;
        } else if (value >= 1000) {
            return `$${(value / 1000).toFixed(2)}K`;
        }
        return `$${value.toFixed(2)}`;
    };
    const getFormattedVolume = (volumeStr)=>{
        const volumeInUSD = parseVolume(volumeStr);
        return formatCurrency(volumeInUSD);
    };
    // Calculate price for Yes/No selection (Polymarket style: Yes + No = 100 cents)
    const calculatePrice = (optionIndex, selection)=>{
        const totalPool = market.options.reduce((sum, opt)=>sum + opt.amountBet, 0);
        const option = market.options[optionIndex];
        // Calculate probability percentage (0-100)
        const probabilityPercent = option.amountBet / totalPool * 100;
        if (selection === "yes") {
            // Yes price in cents = probability percentage
            return probabilityPercent;
        } else {
            // No price in cents = 100 - probability percentage
            return 100 - probabilityPercent;
        }
    };
    // Convert cents to dollars for display
    const centsToDollars = (cents)=>{
        return cents / 100;
    };
    // Calculate total allocated amount (for display purposes only)
    const totalAllocated = Object.values(allocations).reduce((sum, alloc)=>sum + (alloc.selection ? alloc.amount : 0), 0);
    // Calculate total allocation for a specific option (Yes + No combined)
    const getOptionTotalAllocation = (optionIndex)=>{
        const alloc = allocations[optionIndex];
        if (!alloc) return 0;
        // For the same option, if there's any allocation (Yes or No), return that amount
        // Since you can only have one selection (Yes OR No) at a time, this works
        return alloc.selection ? alloc.amount : 0;
    };
    // Get available amount to sell for a specific option and selection
    const getAvailableToSell = (optionIndex, selection)=>{
        const position = boughtPositions.find((pos)=>pos.optionIndex === optionIndex && pos.selection === selection);
        return position ? position.amount : 0;
    };
    // Trading balance is the maximum amount you can allocate to EACH option (not a shared pool)
    // So you can allocate the full amount to all options independently
    // Handle allocation change
    const handleAllocationChange = (optionIndex, selection, amount, buySellMode)=>{
        const newAmount = Math.max(0, amount);
        setAllocations((prev)=>{
            const current = prev[optionIndex] || {
                optionIndex,
                selection: null,
                amount: 0,
                buySellMode: "buy"
            };
            return {
                ...prev,
                [optionIndex]: {
                    optionIndex,
                    selection,
                    amount: newAmount,
                    buySellMode: buySellMode || current.buySellMode || "buy"
                }
            };
        });
    // VUSDC will be updated automatically via useEffect when allocations change
    };
    // Calculate potential winnings for an allocation (Polymarket style)
    // If you bet $X at price $P (in dollars), you get $X / $P shares
    // If it wins, each share pays $1, so total return = $X / $P
    const calculatePotentialWinnings = (optionIndex, selection, amount)=>{
        const priceCents = calculatePrice(optionIndex, selection);
        const priceDollars = centsToDollars(priceCents);
        // Total return if it wins (includes original bet)
        return amount / priceDollars;
    };
    // Calculate maximum potential winnings (since only one option can win)
    const maxPotentialWinnings = Object.values(allocations).filter((alloc)=>alloc.selection !== null && alloc.amount > 0).reduce((max, alloc)=>{
        if (alloc.selection) {
            const potentialReturn = calculatePotentialWinnings(alloc.optionIndex, alloc.selection, alloc.amount);
            return Math.max(max, potentialReturn);
        }
        return max;
    }, 0);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-background text-foreground",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2d$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                title: "Market Details",
                showBackButton: true,
                onBackClick: ()=>router.push("/"),
                userBalance: userBalance
            }, userBalance, false, {
                fileName: "[project]/app/market/[id]/page.tsx",
                lineNumber: 588,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "sticky top-[65px] z-40 bg-background/95 backdrop-blur-sm border-b border-border/80",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-4xl mx-auto px-6 pt-3 pb-2.5",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-4",
                                children: tradingBalance > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 px-3 py-1.5 rounded-md bg-green-500/10 border border-green-500/20",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs font-medium text-muted-foreground",
                                            children: "USDC"
                                        }, void 0, false, {
                                            fileName: "[project]/app/market/[id]/page.tsx",
                                            lineNumber: 604,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm font-semibold font-mono text-green-600 dark:text-green-400",
                                            children: [
                                                "$",
                                                tradingBalance.toFixed(2)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/market/[id]/page.tsx",
                                            lineNumber: 605,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/market/[id]/page.tsx",
                                    lineNumber: 603,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-xs text-muted-foreground",
                                    children: "No funds deposited for this market"
                                }, void 0, false, {
                                    fileName: "[project]/app/market/[id]/page.tsx",
                                    lineNumber: 608,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/market/[id]/page.tsx",
                                lineNumber: 600,
                                columnNumber: 13
                            }, this),
                            !authenticated || !wallet ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-muted-foreground px-3 py-1.5",
                                children: "Connect MetaMask to deposit"
                            }, void 0, false, {
                                fileName: "[project]/app/market/[id]/page.tsx",
                                lineNumber: 614,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setDepositDialogOpen(true),
                                className: "px-5 py-2 rounded-lg bg-foreground text-background hover:opacity-90 transition-opacity font-semibold text-sm whitespace-nowrap",
                                disabled: isProcessingTransaction,
                                children: isProcessingTransaction ? "Processing..." : "Deposit for This Market"
                            }, void 0, false, {
                                fileName: "[project]/app/market/[id]/page.tsx",
                                lineNumber: 618,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/market/[id]/page.tsx",
                        lineNumber: 599,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/market/[id]/page.tsx",
                    lineNumber: 598,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/market/[id]/page.tsx",
                lineNumber: 597,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "max-w-4xl mx-auto px-6 py-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-medium text-muted-foreground uppercase tracking-widest",
                                        children: market.category
                                    }, void 0, false, {
                                        fileName: "[project]/app/market/[id]/page.tsx",
                                        lineNumber: 635,
                                        columnNumber: 13
                                    }, this),
                                    market.trend && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `flex items-center gap-1 text-xs font-medium ${market.trend > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                                size: 12
                                            }, void 0, false, {
                                                fileName: "[project]/app/market/[id]/page.tsx",
                                                lineNumber: 646,
                                                columnNumber: 17
                                            }, this),
                                            market.trend > 0 ? "+" : "",
                                            market.trend,
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/market/[id]/page.tsx",
                                        lineNumber: 639,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/market/[id]/page.tsx",
                                lineNumber: 634,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-2xl font-semibold",
                                    children: market.question
                                }, void 0, false, {
                                    fileName: "[project]/app/market/[id]/page.tsx",
                                    lineNumber: 653,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/market/[id]/page.tsx",
                                lineNumber: 652,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-6 text-sm text-muted-foreground",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "Volume: ",
                                            getFormattedVolume(market.volume)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/market/[id]/page.tsx",
                                        lineNumber: 656,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "Traders: ",
                                            market.traders
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/market/[id]/page.tsx",
                                        lineNumber: 657,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "Closes in: ",
                                            market.timeLeft
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/market/[id]/page.tsx",
                                        lineNumber: 658,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/market/[id]/page.tsx",
                                lineNumber: 655,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/market/[id]/page.tsx",
                        lineNumber: 633,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-8",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$price$2d$chart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            options: market.options
                        }, void 0, false, {
                            fileName: "[project]/app/market/[id]/page.tsx",
                            lineNumber: 664,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/market/[id]/page.tsx",
                        lineNumber: 663,
                        columnNumber: 9
                    }, this),
                    tradingBalance > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-8 p-6 rounded-lg border border-border bg-muted/30",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-lg font-semibold mb-1",
                                            children: "Trading Balance"
                                        }, void 0, false, {
                                            fileName: "[project]/app/market/[id]/page.tsx",
                                            lineNumber: 672,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-muted-foreground",
                                            children: "Available funds for this market"
                                        }, void 0, false, {
                                            fileName: "[project]/app/market/[id]/page.tsx",
                                            lineNumber: 673,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/market/[id]/page.tsx",
                                    lineNumber: 671,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-right",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-2xl font-bold font-mono",
                                            children: [
                                                "$",
                                                tradingBalance.toFixed(2)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/market/[id]/page.tsx",
                                            lineNumber: 676,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs text-muted-foreground mt-1",
                                            children: [
                                                "Max per option: $",
                                                tradingBalance.toFixed(2)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/market/[id]/page.tsx",
                                            lineNumber: 677,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs text-muted-foreground mt-1",
                                            children: [
                                                "Total allocated: $",
                                                totalAllocated.toFixed(2)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/market/[id]/page.tsx",
                                            lineNumber: 680,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/market/[id]/page.tsx",
                                    lineNumber: 675,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/market/[id]/page.tsx",
                            lineNumber: 670,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/market/[id]/page.tsx",
                        lineNumber: 669,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6 mb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-lg font-semibold mb-4",
                                children: "Allocate Your Trading Balance"
                            }, void 0, false, {
                                fileName: "[project]/app/market/[id]/page.tsx",
                                lineNumber: 690,
                                columnNumber: 11
                            }, this),
                            market.options.map((option, optionIndex)=>{
                                const allocation = allocations[optionIndex] || {
                                    optionIndex,
                                    selection: null,
                                    amount: 0,
                                    buySellMode: "buy"
                                };
                                const yesPrice = calculatePrice(optionIndex, "yes");
                                const noPrice = calculatePrice(optionIndex, "no");
                                const totalPool = market.options.reduce((sum, opt)=>sum + opt.amountBet, 0);
                                const optionPercentage = option.amountBet / totalPool * 100;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `option-${optionIndex} p-6 rounded-lg border border-border bg-muted/20 hover:bg-muted/30 dark:hover:bg-muted/50 transition-colors`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between mb-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "text-lg font-semibold mb-2",
                                                            children: option.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/market/[id]/page.tsx",
                                                            lineNumber: 711,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-4 text-sm text-muted-foreground",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: [
                                                                        optionPercentage.toFixed(1),
                                                                        "% probability"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/market/[id]/page.tsx",
                                                                    lineNumber: 713,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: "•"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/market/[id]/page.tsx",
                                                                    lineNumber: 714,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: [
                                                                        formatCurrency(option.amountBet),
                                                                        " bet"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/market/[id]/page.tsx",
                                                                    lineNumber: 715,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/market/[id]/page.tsx",
                                                            lineNumber: 712,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/market/[id]/page.tsx",
                                                    lineNumber: 710,
                                                    columnNumber: 19
                                                }, this),
                                                tradingBalance > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-500/10 border border-blue-500/20",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs font-medium text-muted-foreground",
                                                            children: "VUSDC"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/market/[id]/page.tsx",
                                                            lineNumber: 721,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-sm font-semibold font-mono text-blue-600 dark:text-blue-400",
                                                            children: [
                                                                "$",
                                                                (tradingBalance - getOptionTotalAllocation(optionIndex)).toFixed(2)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/market/[id]/page.tsx",
                                                            lineNumber: 722,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/market/[id]/page.tsx",
                                                    lineNumber: 720,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/market/[id]/page.tsx",
                                            lineNumber: 709,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mb-4 flex items-center gap-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>{
                                                            if (allocation.selection) {
                                                                handleAllocationChange(optionIndex, allocation.selection, allocation.amount, "buy");
                                                            } else {
                                                                setAllocations((prev)=>({
                                                                        ...prev,
                                                                        [optionIndex]: {
                                                                            ...prev[optionIndex] || {
                                                                                optionIndex,
                                                                                selection: null,
                                                                                amount: 0,
                                                                                buySellMode: "buy"
                                                                            },
                                                                            buySellMode: "buy"
                                                                        }
                                                                    }));
                                                            }
                                                        },
                                                        className: `px-4 py-2 text-sm font-semibold transition-all relative ${(allocation.buySellMode || "buy") === "buy" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`,
                                                        children: [
                                                            "Buy",
                                                            (allocation.buySellMode || "buy") === "buy" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "absolute bottom-0 left-0 right-0 h-0.5 bg-foreground"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/market/[id]/page.tsx",
                                                                lineNumber: 759,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/market/[id]/page.tsx",
                                                        lineNumber: 732,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>{
                                                            if (allocation.selection) {
                                                                handleAllocationChange(optionIndex, allocation.selection, allocation.amount, "sell");
                                                            } else {
                                                                setAllocations((prev)=>({
                                                                        ...prev,
                                                                        [optionIndex]: {
                                                                            ...prev[optionIndex] || {
                                                                                optionIndex,
                                                                                selection: null,
                                                                                amount: 0,
                                                                                buySellMode: "buy"
                                                                            },
                                                                            buySellMode: "sell"
                                                                        }
                                                                    }));
                                                            }
                                                        },
                                                        className: `px-4 py-2 text-sm font-semibold transition-all relative ${allocation.buySellMode === "sell" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`,
                                                        children: [
                                                            "Sell",
                                                            allocation.buySellMode === "sell" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "absolute bottom-0 left-0 right-0 h-0.5 bg-foreground"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/market/[id]/page.tsx",
                                                                lineNumber: 789,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/market/[id]/page.tsx",
                                                        lineNumber: 762,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/market/[id]/page.tsx",
                                                lineNumber: 731,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/market/[id]/page.tsx",
                                            lineNumber: 730,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-2 gap-4 mb-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                        const currentMode = allocation.buySellMode || "buy";
                                                        // In Sell mode, check if user has bought position for Yes
                                                        if (currentMode === "sell") {
                                                            const availableToSell = getAvailableToSell(optionIndex, "yes");
                                                            if (availableToSell === 0) {
                                                                // Can't sell if nothing was bought
                                                                return;
                                                            }
                                                        }
                                                        // In Buy mode, if switching from No to Yes, clear the No allocation and switch to Yes
                                                        if (currentMode === "buy" && allocation.selection === "no" && allocation.amount > 0) {
                                                            // Clear No and switch to Yes with 0 amount (VUSDC is shared)
                                                            setAllocations((prev)=>({
                                                                    ...prev,
                                                                    [optionIndex]: {
                                                                        optionIndex,
                                                                        selection: "yes",
                                                                        amount: 0,
                                                                        buySellMode: currentMode
                                                                    }
                                                                }));
                                                            setPlacedAllocations((prev)=>{
                                                                const newSet = new Set(prev);
                                                                newSet.delete(optionIndex);
                                                                return newSet;
                                                            });
                                                            return;
                                                        }
                                                        if (allocation.selection === "yes" && allocation.buySellMode === currentMode) {
                                                            // Deselect if already selected with same mode
                                                            handleAllocationChange(optionIndex, null, 0, currentMode);
                                                            setPlacedAllocations((prev)=>{
                                                                const newSet = new Set(prev);
                                                                newSet.delete(optionIndex);
                                                                return newSet;
                                                            });
                                                        } else {
                                                            // Switch to Yes
                                                            const newAmount = currentMode === "sell" ? Math.min(allocation.amount || 0, getAvailableToSell(optionIndex, "yes")) : 0 // Always start with 0 when switching in Buy mode
                                                            ;
                                                            handleAllocationChange(optionIndex, "yes", newAmount, currentMode);
                                                            // Clear placed status when selection changes
                                                            if (placedAllocations.has(optionIndex)) {
                                                                setPlacedAllocations((prev)=>{
                                                                    const newSet = new Set(prev);
                                                                    newSet.delete(optionIndex);
                                                                    return newSet;
                                                                });
                                                            }
                                                        }
                                                    },
                                                    className: `p-4 rounded-lg border-2 transition-all ${allocation.selection === "yes" && (allocation.buySellMode || "buy") === (allocation.buySellMode || "buy") ? "border-green-500 bg-green-500 text-white" : allocation.selection === "yes" ? "border-green-500/50 bg-green-500/10 text-green-600 dark:text-green-400" : "border-border bg-muted/30 hover:border-green-500/50 hover:bg-green-500/5 dark:hover:border-green-500 dark:hover:bg-green-500/15"}`,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-left w-full",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "font-semibold mb-1",
                                                                children: [
                                                                    "Yes ",
                                                                    yesPrice.toFixed(0),
                                                                    "¢"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/market/[id]/page.tsx",
                                                                lineNumber: 869,
                                                                columnNumber: 23
                                                            }, this),
                                                            allocation.buySellMode === "sell" && getAvailableToSell(optionIndex, "yes") > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-xs mt-1 text-muted-foreground",
                                                                children: [
                                                                    "Own: $",
                                                                    getAvailableToSell(optionIndex, "yes").toFixed(2)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/market/[id]/page.tsx",
                                                                lineNumber: 873,
                                                                columnNumber: 25
                                                            }, this),
                                                            allocation.selection === "yes" && allocation.amount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-xs mt-1 opacity-90",
                                                                children: [
                                                                    allocation.buySellMode === "sell" ? "Sell" : "Buy",
                                                                    " $",
                                                                    allocation.amount.toFixed(2)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/market/[id]/page.tsx",
                                                                lineNumber: 878,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/market/[id]/page.tsx",
                                                        lineNumber: 868,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/market/[id]/page.tsx",
                                                    lineNumber: 798,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                        const currentMode = allocation.buySellMode || "buy";
                                                        // In Sell mode, check if user has bought position for No
                                                        if (currentMode === "sell") {
                                                            const availableToSell = getAvailableToSell(optionIndex, "no");
                                                            if (availableToSell === 0) {
                                                                // Can't sell if nothing was bought
                                                                return;
                                                            }
                                                        }
                                                        // In Buy mode, if switching from Yes to No, clear the Yes allocation and switch to No
                                                        if (currentMode === "buy" && allocation.selection === "yes" && allocation.amount > 0) {
                                                            // Clear Yes and switch to No with 0 amount (VUSDC is shared)
                                                            setAllocations((prev)=>({
                                                                    ...prev,
                                                                    [optionIndex]: {
                                                                        optionIndex,
                                                                        selection: "no",
                                                                        amount: 0,
                                                                        buySellMode: currentMode
                                                                    }
                                                                }));
                                                            setPlacedAllocations((prev)=>{
                                                                const newSet = new Set(prev);
                                                                newSet.delete(optionIndex);
                                                                return newSet;
                                                            });
                                                            return;
                                                        }
                                                        if (allocation.selection === "no" && allocation.buySellMode === currentMode) {
                                                            // Deselect if already selected with same mode
                                                            handleAllocationChange(optionIndex, null, 0, currentMode);
                                                            setPlacedAllocations((prev)=>{
                                                                const newSet = new Set(prev);
                                                                newSet.delete(optionIndex);
                                                                return newSet;
                                                            });
                                                        } else {
                                                            // Switch to No
                                                            const newAmount = currentMode === "sell" ? Math.min(allocation.amount || 0, getAvailableToSell(optionIndex, "no")) : 0 // Always start with 0 when switching in Buy mode
                                                            ;
                                                            handleAllocationChange(optionIndex, "no", newAmount, currentMode);
                                                            // Clear placed status when selection changes
                                                            if (placedAllocations.has(optionIndex)) {
                                                                setPlacedAllocations((prev)=>{
                                                                    const newSet = new Set(prev);
                                                                    newSet.delete(optionIndex);
                                                                    return newSet;
                                                                });
                                                            }
                                                        }
                                                    },
                                                    className: `p-4 rounded-lg border-2 transition-all ${allocation.selection === "no" && (allocation.buySellMode || "buy") === (allocation.buySellMode || "buy") ? "border-red-500 bg-red-500 text-white" : allocation.selection === "no" ? "border-red-500/50 bg-red-500/10 text-red-600 dark:text-red-400" : "border-border bg-muted/30 hover:border-red-500/50 hover:bg-red-500/5 dark:hover:border-red-500 dark:hover:bg-red-500/15"}`,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-left w-full",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "font-semibold mb-1",
                                                                children: [
                                                                    "No ",
                                                                    noPrice.toFixed(0),
                                                                    "¢"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/market/[id]/page.tsx",
                                                                lineNumber: 957,
                                                                columnNumber: 23
                                                            }, this),
                                                            allocation.buySellMode === "sell" && getAvailableToSell(optionIndex, "no") > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-xs mt-1 text-muted-foreground",
                                                                children: [
                                                                    "Own: $",
                                                                    getAvailableToSell(optionIndex, "no").toFixed(2)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/market/[id]/page.tsx",
                                                                lineNumber: 961,
                                                                columnNumber: 25
                                                            }, this),
                                                            allocation.selection === "no" && allocation.amount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-xs mt-1 opacity-90",
                                                                children: [
                                                                    allocation.buySellMode === "sell" ? "Sell" : "Buy",
                                                                    " $",
                                                                    allocation.amount.toFixed(2)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/market/[id]/page.tsx",
                                                                lineNumber: 966,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/market/[id]/page.tsx",
                                                        lineNumber: 956,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/market/[id]/page.tsx",
                                                    lineNumber: 886,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/market/[id]/page.tsx",
                                            lineNumber: 796,
                                            columnNumber: 17
                                        }, this),
                                        allocation.selection && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-4 p-4 rounded-lg bg-background border border-border",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-xs font-medium text-muted-foreground uppercase tracking-widest block mb-2",
                                                    children: "Amount to Allocate"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/market/[id]/page.tsx",
                                                    lineNumber: 977,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2 mb-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-muted-foreground",
                                                            children: "$"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/market/[id]/page.tsx",
                                                            lineNumber: 981,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "number",
                                                            value: allocation.amount || "",
                                                            onChange: (e)=>{
                                                                let amount = Number.parseFloat(e.target.value) || 0;
                                                                const currentMode = allocation.buySellMode || "buy";
                                                                // In Sell mode, limit to available to sell
                                                                if (currentMode === "sell" && allocation.selection) {
                                                                    const maxSell = getAvailableToSell(optionIndex, allocation.selection);
                                                                    amount = Math.min(amount, maxSell);
                                                                }
                                                                // In Buy mode, limit to available VUSDC (shared between Yes/No for same option)
                                                                if (currentMode === "buy" && allocation.selection) {
                                                                    const currentAllocation = allocations[optionIndex];
                                                                    const otherAllocation = currentAllocation?.selection === allocation.selection ? 0 : currentAllocation?.amount || 0;
                                                                    const availableVusdc = tradingBalance - otherAllocation;
                                                                    amount = Math.min(amount, availableVusdc);
                                                                }
                                                                handleAllocationChange(optionIndex, allocation.selection, amount, currentMode);
                                                                // Remove from placed allocations if amount changes
                                                                if (placedAllocations.has(optionIndex)) {
                                                                    setPlacedAllocations((prev)=>{
                                                                        const newSet = new Set(prev);
                                                                        newSet.delete(optionIndex);
                                                                        return newSet;
                                                                    });
                                                                }
                                                            },
                                                            placeholder: "0.00",
                                                            className: "flex-1 bg-transparent text-foreground font-mono focus:outline-none placeholder-muted-foreground/50",
                                                            step: "0.01",
                                                            min: "0",
                                                            max: allocation.buySellMode === "sell" && allocation.selection ? getAvailableToSell(optionIndex, allocation.selection) : tradingBalance - getOptionTotalAllocation(optionIndex) + (allocation.selection ? allocation.amount : 0)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/market/[id]/page.tsx",
                                                            lineNumber: 982,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: async ()=>{
                                                                const currentMode = allocation.buySellMode || "buy";
                                                                let canPlace = false;
                                                                if (currentMode === "sell") {
                                                                    // In Sell mode, check if amount is within available to sell
                                                                    const availableToSell = getAvailableToSell(optionIndex, allocation.selection);
                                                                    canPlace = allocation.amount > 0 && allocation.amount <= availableToSell;
                                                                } else {
                                                                    // In Buy mode, check VUSDC (shared for Yes/No in same option)
                                                                    const availableVusdc = tradingBalance - getOptionTotalAllocation(optionIndex) + allocation.amount;
                                                                    canPlace = allocation.amount > 0 && allocation.amount <= availableVusdc;
                                                                }
                                                                if (canPlace) {
                                                                    // Record transaction - Scenario 2: Place Bet (this will trigger MetaMask)
                                                                    const tx = await recordTransaction({
                                                                        type: "bet",
                                                                        marketId: marketId,
                                                                        marketQuestion: market?.question,
                                                                        optionName: market?.options[optionIndex]?.name,
                                                                        selection: allocation.selection || undefined,
                                                                        buySellMode: currentMode,
                                                                        amount: allocation.amount
                                                                    });
                                                                    // Only update state if transaction was successful
                                                                    if (tx) {
                                                                        setPlacedAllocations((prev)=>new Set(prev).add(optionIndex));
                                                                        // If it's a Buy transaction, track the bought position
                                                                        if (currentMode === "buy" && allocation.selection) {
                                                                            setBoughtPositions((prev)=>{
                                                                                const existing = prev.find((p)=>p.optionIndex === optionIndex && p.selection === allocation.selection);
                                                                                if (existing) {
                                                                                    // Update existing position
                                                                                    return prev.map((p)=>p.optionIndex === optionIndex && p.selection === allocation.selection ? {
                                                                                            ...p,
                                                                                            amount: p.amount + allocation.amount
                                                                                        } : p);
                                                                                } else {
                                                                                    // Add new position
                                                                                    return [
                                                                                        ...prev,
                                                                                        {
                                                                                            optionIndex,
                                                                                            selection: allocation.selection,
                                                                                            amount: allocation.amount
                                                                                        }
                                                                                    ];
                                                                                }
                                                                            });
                                                                        }
                                                                        // If it's a Sell transaction, reduce the bought position
                                                                        if (currentMode === "sell" && allocation.selection) {
                                                                            setBoughtPositions((prev)=>{
                                                                                return prev.map((p)=>{
                                                                                    if (p.optionIndex === optionIndex && p.selection === allocation.selection) {
                                                                                        const newAmount = p.amount - allocation.amount;
                                                                                        return newAmount > 0 ? {
                                                                                            ...p,
                                                                                            amount: newAmount
                                                                                        } : null;
                                                                                    }
                                                                                    return p;
                                                                                }).filter(Boolean);
                                                                            });
                                                                        }
                                                                    }
                                                                }
                                                            },
                                                            disabled: !allocation.amount || allocation.amount <= 0 || (allocation.buySellMode === "sell" ? allocation.amount > getAvailableToSell(optionIndex, allocation.selection) : allocation.amount > tradingBalance - getOptionTotalAllocation(optionIndex) + allocation.amount) || placedAllocations.has(optionIndex) || isProcessingTransaction || !authenticated || !wallet,
                                                            className: `px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${allocation.amount > 0 && (allocation.buySellMode === "sell" ? allocation.amount <= getAvailableToSell(optionIndex, allocation.selection) : allocation.amount <= tradingBalance - getOptionTotalAllocation(optionIndex) + allocation.amount) && !placedAllocations.has(optionIndex) ? "bg-foreground text-background hover:opacity-90" : placedAllocations.has(optionIndex) ? "bg-green-600 dark:bg-green-500 text-white cursor-default" : "bg-muted text-muted-foreground cursor-not-allowed"}`,
                                                            children: isProcessingTransaction ? "Processing..." : placedAllocations.has(optionIndex) ? "✓ Placed" : "Place"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/market/[id]/page.tsx",
                                                            lineNumber: 1029,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/market/[id]/page.tsx",
                                                    lineNumber: 980,
                                                    columnNumber: 21
                                                }, this),
                                                allocation.amount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm text-muted-foreground",
                                                    children: [
                                                        "Potential return: $",
                                                        calculatePotentialWinnings(optionIndex, allocation.selection, allocation.amount).toFixed(2),
                                                        " (includes your $",
                                                        allocation.amount.toFixed(2),
                                                        " bet)"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/market/[id]/page.tsx",
                                                    lineNumber: 1132,
                                                    columnNumber: 23
                                                }, this),
                                                allocation.buySellMode === "sell" && allocation.selection && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        allocation.amount > getAvailableToSell(optionIndex, allocation.selection) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs text-red-600 dark:text-red-400 mt-2",
                                                            children: [
                                                                "Warning: Cannot sell more than you bought. Available to sell: $",
                                                                getAvailableToSell(optionIndex, allocation.selection).toFixed(2)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/market/[id]/page.tsx",
                                                            lineNumber: 1143,
                                                            columnNumber: 27
                                                        }, this),
                                                        getAvailableToSell(optionIndex, allocation.selection) > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs text-muted-foreground mt-2",
                                                            children: [
                                                                "Available to sell: $",
                                                                getAvailableToSell(optionIndex, allocation.selection).toFixed(2)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/market/[id]/page.tsx",
                                                            lineNumber: 1148,
                                                            columnNumber: 27
                                                        }, this),
                                                        getAvailableToSell(optionIndex, allocation.selection) === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs text-muted-foreground mt-2",
                                                            children: "No position to sell. Buy first to create a position."
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/market/[id]/page.tsx",
                                                            lineNumber: 1153,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true),
                                                allocation.buySellMode !== "sell" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        allocation.amount > tradingBalance - getOptionTotalAllocation(optionIndex) + allocation.amount && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs text-red-600 dark:text-red-400 mt-2",
                                                            children: "Warning: Amount exceeds available VUSDC. VUSDC is shared between Yes/No for this option."
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/market/[id]/page.tsx",
                                                            lineNumber: 1162,
                                                            columnNumber: 27
                                                        }, this),
                                                        allocation.selection === "yes" && allocations[optionIndex]?.selection === "no" && allocations[optionIndex]?.amount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs text-red-600 dark:text-red-400 mt-2",
                                                            children: [
                                                                "Warning: You already have $",
                                                                allocations[optionIndex].amount.toFixed(2),
                                                                ' allocated to "No". VUSDC is shared between Yes/No.'
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/market/[id]/page.tsx",
                                                            lineNumber: 1167,
                                                            columnNumber: 27
                                                        }, this),
                                                        allocation.selection === "no" && allocations[optionIndex]?.selection === "yes" && allocations[optionIndex]?.amount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs text-red-600 dark:text-red-400 mt-2",
                                                            children: [
                                                                "Warning: You already have $",
                                                                allocations[optionIndex].amount.toFixed(2),
                                                                ' allocated to "Yes". VUSDC is shared between Yes/No.'
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/market/[id]/page.tsx",
                                                            lineNumber: 1172,
                                                            columnNumber: 27
                                                        }, this),
                                                        allocation.amount > 0 && allocation.amount <= tradingBalance - getOptionTotalAllocation(optionIndex) + allocation.amount && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs text-muted-foreground mt-2",
                                                            children: [
                                                                "Remaining VUSDC: $",
                                                                (tradingBalance - getOptionTotalAllocation(optionIndex)).toFixed(2)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/market/[id]/page.tsx",
                                                            lineNumber: 1177,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true),
                                                placedAllocations.has(optionIndex) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs text-green-600 dark:text-green-400 mt-2 font-medium",
                                                    children: "✓ Allocation placed successfully"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/market/[id]/page.tsx",
                                                    lineNumber: 1184,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/market/[id]/page.tsx",
                                            lineNumber: 976,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, optionIndex, true, {
                                    fileName: "[project]/app/market/[id]/page.tsx",
                                    lineNumber: 704,
                                    columnNumber: 15
                                }, this);
                            })
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/market/[id]/page.tsx",
                        lineNumber: 689,
                        columnNumber: 9
                    }, this),
                    totalAllocated > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-8 p-6 rounded-lg border border-border bg-muted/50",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-semibold mb-4",
                                children: "Allocation Summary"
                            }, void 0, false, {
                                fileName: "[project]/app/market/[id]/page.tsx",
                                lineNumber: 1198,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2 mb-4",
                                children: Object.values(allocations).filter((alloc)=>alloc.selection && alloc.amount > 0).map((alloc, idx)=>{
                                    const potentialReturn = calculatePotentialWinnings(alloc.optionIndex, alloc.selection, alloc.amount);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between text-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-muted-foreground",
                                                                children: [
                                                                    market.options[alloc.optionIndex].name,
                                                                    " - ",
                                                                    alloc.selection?.toUpperCase()
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/market/[id]/page.tsx",
                                                                lineNumber: 1212,
                                                                columnNumber: 27
                                                            }, this),
                                                            placedAllocations.has(alloc.optionIndex) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs text-green-600 dark:text-green-400 font-medium",
                                                                children: "✓ Placed"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/market/[id]/page.tsx",
                                                                lineNumber: 1216,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/market/[id]/page.tsx",
                                                        lineNumber: 1211,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-mono",
                                                        children: [
                                                            "$",
                                                            alloc.amount.toFixed(2)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/market/[id]/page.tsx",
                                                        lineNumber: 1221,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/market/[id]/page.tsx",
                                                lineNumber: 1210,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-end text-xs text-muted-foreground",
                                                children: [
                                                    "Potential return: $",
                                                    potentialReturn.toFixed(2)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/market/[id]/page.tsx",
                                                lineNumber: 1225,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, idx, true, {
                                        fileName: "[project]/app/market/[id]/page.tsx",
                                        lineNumber: 1209,
                                        columnNumber: 21
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/app/market/[id]/page.tsx",
                                lineNumber: 1199,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "pt-4 border-t border-border",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between mb-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-semibold",
                                                children: "Max Potential Return:"
                                            }, void 0, false, {
                                                fileName: "[project]/app/market/[id]/page.tsx",
                                                lineNumber: 1234,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-mono text-lg font-semibold",
                                                children: [
                                                    "$",
                                                    maxPotentialWinnings.toFixed(2)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/market/[id]/page.tsx",
                                                lineNumber: 1235,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/market/[id]/page.tsx",
                                        lineNumber: 1233,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-muted-foreground mt-1",
                                        children: "Maximum return if your winning allocation succeeds"
                                    }, void 0, false, {
                                        fileName: "[project]/app/market/[id]/page.tsx",
                                        lineNumber: 1239,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/market/[id]/page.tsx",
                                lineNumber: 1232,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/market/[id]/page.tsx",
                        lineNumber: 1197,
                        columnNumber: 11
                    }, this),
                    transactions.filter((tx)=>tx.marketId === marketId).length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-8 p-6 rounded-lg border border-border bg-muted/30",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-semibold mb-4",
                                children: "Transaction History"
                            }, void 0, false, {
                                fileName: "[project]/app/market/[id]/page.tsx",
                                lineNumber: 1249,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: transactions.filter((tx)=>tx.marketId === marketId).slice(0, 10) // Show last 10 transactions
                                .map((tx)=>{
                                    const date = new Date(tx.timestamp);
                                    const formattedDate = date.toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric"
                                    });
                                    const formattedTime = date.toLocaleTimeString("en-US", {
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    });
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4 rounded-lg border border-border bg-background hover:bg-muted/50 transition-colors",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-start justify-between gap-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2 mb-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-sm font-semibold capitalize",
                                                                    children: tx.type === "deposit" ? "Deposit" : `${tx.buySellMode === "sell" ? "Sell" : "Buy"} Bet`
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/market/[id]/page.tsx",
                                                                    lineNumber: 1274,
                                                                    columnNumber: 29
                                                                }, this),
                                                                tx.status === "completed" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "flex items-center gap-1 text-xs text-green-600 dark:text-green-400 font-medium",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                                            size: 14
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/market/[id]/page.tsx",
                                                                            lineNumber: 1279,
                                                                            columnNumber: 33
                                                                        }, this),
                                                                        "Completed"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/market/[id]/page.tsx",
                                                                    lineNumber: 1278,
                                                                    columnNumber: 31
                                                                }, this),
                                                                tx.status === "pending" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "flex items-center gap-1 text-xs text-yellow-600 dark:text-yellow-400 font-medium",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                                            size: 14
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/market/[id]/page.tsx",
                                                                            lineNumber: 1285,
                                                                            columnNumber: 33
                                                                        }, this),
                                                                        "Pending"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/market/[id]/page.tsx",
                                                                    lineNumber: 1284,
                                                                    columnNumber: 31
                                                                }, this),
                                                                tx.status === "failed" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "flex items-center gap-1 text-xs text-red-600 dark:text-red-400 font-medium",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                                                            size: 14
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/market/[id]/page.tsx",
                                                                            lineNumber: 1291,
                                                                            columnNumber: 33
                                                                        }, this),
                                                                        "Failed"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/market/[id]/page.tsx",
                                                                    lineNumber: 1290,
                                                                    columnNumber: 31
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/market/[id]/page.tsx",
                                                            lineNumber: 1273,
                                                            columnNumber: 27
                                                        }, this),
                                                        tx.type === "bet" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-sm text-muted-foreground space-y-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "font-medium",
                                                                            children: "Option:"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/market/[id]/page.tsx",
                                                                            lineNumber: 1300,
                                                                            columnNumber: 33
                                                                        }, this),
                                                                        " ",
                                                                        tx.optionName
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/market/[id]/page.tsx",
                                                                    lineNumber: 1299,
                                                                    columnNumber: 31
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "font-medium",
                                                                            children: "Selection:"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/market/[id]/page.tsx",
                                                                            lineNumber: 1303,
                                                                            columnNumber: 33
                                                                        }, this),
                                                                        " ",
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "capitalize",
                                                                            children: tx.selection
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/market/[id]/page.tsx",
                                                                            lineNumber: 1304,
                                                                            columnNumber: 33
                                                                        }, this),
                                                                        tx.buySellMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "ml-2 text-xs px-2 py-0.5 rounded bg-muted",
                                                                            children: tx.buySellMode === "buy" ? "Buy" : "Sell"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/market/[id]/page.tsx",
                                                                            lineNumber: 1306,
                                                                            columnNumber: 35
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/market/[id]/page.tsx",
                                                                    lineNumber: 1302,
                                                                    columnNumber: 31
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/market/[id]/page.tsx",
                                                            lineNumber: 1298,
                                                            columnNumber: 29
                                                        }, this),
                                                        tx.type === "deposit" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-sm text-muted-foreground",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-medium",
                                                                    children: "Market:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/market/[id]/page.tsx",
                                                                    lineNumber: 1316,
                                                                    columnNumber: 31
                                                                }, this),
                                                                " ",
                                                                tx.marketQuestion
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/market/[id]/page.tsx",
                                                            lineNumber: 1315,
                                                            columnNumber: 29
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-2 flex items-center gap-4 text-xs text-muted-foreground",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: [
                                                                        formattedDate,
                                                                        " at ",
                                                                        formattedTime
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/market/[id]/page.tsx",
                                                                    lineNumber: 1321,
                                                                    columnNumber: 29
                                                                }, this),
                                                                tx.txHash && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                    href: `https://coston2-explorer.flare.network/tx/${tx.txHash}`,
                                                                    target: "_blank",
                                                                    rel: "noopener noreferrer",
                                                                    className: "flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline",
                                                                    children: [
                                                                        "View on Explorer",
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                                                            size: 12
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/market/[id]/page.tsx",
                                                                            lineNumber: 1330,
                                                                            columnNumber: 33
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/market/[id]/page.tsx",
                                                                    lineNumber: 1323,
                                                                    columnNumber: 31
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/market/[id]/page.tsx",
                                                            lineNumber: 1320,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/market/[id]/page.tsx",
                                                    lineNumber: 1272,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-right",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-lg font-semibold font-mono",
                                                            children: [
                                                                tx.type === "deposit" ? "+" : "",
                                                                "$",
                                                                tx.amount.toFixed(2)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/market/[id]/page.tsx",
                                                            lineNumber: 1337,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs text-muted-foreground mt-1",
                                                            children: tx.type === "deposit" ? "Deposited" : "Amount"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/market/[id]/page.tsx",
                                                            lineNumber: 1340,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/market/[id]/page.tsx",
                                                    lineNumber: 1336,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/market/[id]/page.tsx",
                                            lineNumber: 1271,
                                            columnNumber: 23
                                        }, this)
                                    }, tx.id, false, {
                                        fileName: "[project]/app/market/[id]/page.tsx",
                                        lineNumber: 1267,
                                        columnNumber: 21
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/app/market/[id]/page.tsx",
                                lineNumber: 1250,
                                columnNumber: 13
                            }, this),
                            transactions.filter((tx)=>tx.marketId === marketId).length > 10 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 text-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-muted-foreground",
                                    children: [
                                        "Showing last 10 transactions. Total: ",
                                        transactions.filter((tx)=>tx.marketId === marketId).length
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/market/[id]/page.tsx",
                                    lineNumber: 1351,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/market/[id]/page.tsx",
                                lineNumber: 1350,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/market/[id]/page.tsx",
                        lineNumber: 1248,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: async ()=>{
                                    // Place all unplaced allocations
                                    const unplacedOptions = Object.values(allocations).filter((alloc)=>{
                                        if (!alloc.selection || alloc.amount <= 0 || placedAllocations.has(alloc.optionIndex)) {
                                            return false;
                                        }
                                        const currentMode = alloc.buySellMode || "buy";
                                        if (currentMode === "sell") {
                                            // In Sell mode, check available to sell
                                            return alloc.amount <= getAvailableToSell(alloc.optionIndex, alloc.selection);
                                        } else {
                                            // In Buy mode, check VUSDC (shared for Yes/No)
                                            const availableVusdc = tradingBalance - getOptionTotalAllocation(alloc.optionIndex) + alloc.amount;
                                            return alloc.amount <= availableVusdc;
                                        }
                                    });
                                    if (unplacedOptions.length > 0) {
                                        // Process transactions sequentially to avoid multiple MetaMask popups at once
                                        const newSet = new Set(placedAllocations);
                                        for (const alloc of unplacedOptions){
                                            const currentMode = alloc.buySellMode || "buy";
                                            // Record transaction - Scenario 2: Place Bet (this will trigger MetaMask)
                                            const tx = await recordTransaction({
                                                type: "bet",
                                                marketId: marketId,
                                                marketQuestion: market?.question,
                                                optionName: market?.options[alloc.optionIndex]?.name,
                                                selection: alloc.selection || undefined,
                                                buySellMode: currentMode,
                                                amount: alloc.amount
                                            });
                                            // Only update state if transaction was successful
                                            if (tx) {
                                                newSet.add(alloc.optionIndex);
                                                // Track bought positions for Buy transactions
                                                if (currentMode === "buy" && alloc.selection) {
                                                    setBoughtPositions((prevPos)=>{
                                                        const existing = prevPos.find((p)=>p.optionIndex === alloc.optionIndex && p.selection === alloc.selection);
                                                        if (existing) {
                                                            return prevPos.map((p)=>p.optionIndex === alloc.optionIndex && p.selection === alloc.selection ? {
                                                                    ...p,
                                                                    amount: p.amount + alloc.amount
                                                                } : p);
                                                        } else {
                                                            return [
                                                                ...prevPos,
                                                                {
                                                                    optionIndex: alloc.optionIndex,
                                                                    selection: alloc.selection,
                                                                    amount: alloc.amount
                                                                }
                                                            ];
                                                        }
                                                    });
                                                }
                                                // Reduce bought positions for Sell transactions
                                                if (currentMode === "sell" && alloc.selection) {
                                                    setBoughtPositions((prevPos)=>{
                                                        return prevPos.map((p)=>{
                                                            if (p.optionIndex === alloc.optionIndex && p.selection === alloc.selection) {
                                                                const newAmount = p.amount - alloc.amount;
                                                                return newAmount > 0 ? {
                                                                    ...p,
                                                                    amount: newAmount
                                                                } : null;
                                                            }
                                                            return p;
                                                        }).filter(Boolean);
                                                    });
                                                }
                                            }
                                        }
                                        setPlacedAllocations(newSet);
                                    }
                                },
                                disabled: totalAllocated === 0 || tradingBalance === 0 || Object.values(allocations).some((alloc)=>{
                                    if (!alloc.selection || alloc.amount <= 0) return false;
                                    const currentMode = alloc.buySellMode || "buy";
                                    if (currentMode === "sell") {
                                        return alloc.amount > getAvailableToSell(alloc.optionIndex, alloc.selection);
                                    } else {
                                        const availableVusdc = tradingBalance - getOptionTotalAllocation(alloc.optionIndex) + alloc.amount;
                                        return alloc.amount > availableVusdc;
                                    }
                                }) || Object.values(allocations).every((alloc)=>!alloc.selection || alloc.amount <= 0 || placedAllocations.has(alloc.optionIndex)) || isProcessingTransaction || !authenticated || !wallet,
                                className: `flex-1 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${totalAllocated > 0 && tradingBalance > 0 && !Object.values(allocations).some((alloc)=>{
                                    if (!alloc.selection || alloc.amount <= 0) return false;
                                    const currentMode = alloc.buySellMode || "buy";
                                    if (currentMode === "sell") {
                                        return alloc.amount > getAvailableToSell(alloc.optionIndex, alloc.selection);
                                    } else {
                                        const availableVusdc = tradingBalance - getOptionTotalAllocation(alloc.optionIndex) + alloc.amount;
                                        return alloc.amount > availableVusdc;
                                    }
                                }) && Object.values(allocations).some((alloc)=>alloc.selection && alloc.amount > 0 && !placedAllocations.has(alloc.optionIndex)) ? "bg-foreground text-background hover:opacity-90" : "bg-muted text-muted-foreground cursor-not-allowed"}`,
                                children: isProcessingTransaction ? "Processing Transactions..." : "Place All Remaining Allocations"
                            }, void 0, false, {
                                fileName: "[project]/app/market/[id]/page.tsx",
                                lineNumber: 1361,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>router.push("/"),
                                className: "px-6 py-3 text-sm font-medium rounded-lg hover:bg-muted transition-colors border border-border",
                                children: "Cancel"
                            }, void 0, false, {
                                fileName: "[project]/app/market/[id]/page.tsx",
                                lineNumber: 1489,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/market/[id]/page.tsx",
                        lineNumber: 1360,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/market/[id]/page.tsx",
                lineNumber: 631,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
                open: depositDialogOpen,
                onOpenChange: setDepositDialogOpen,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
                    className: "sm:max-w-md",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                    children: "Deposit Funds for This Market"
                                }, void 0, false, {
                                    fileName: "[project]/app/market/[id]/page.tsx",
                                    lineNumber: 1502,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                                    children: "Add funds to your trading balance for this specific market only"
                                }, void 0, false, {
                                    fileName: "[project]/app/market/[id]/page.tsx",
                                    lineNumber: 1503,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/market/[id]/page.tsx",
                            lineNumber: 1501,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4 py-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-sm font-medium text-muted-foreground uppercase tracking-widest block mb-2",
                                            children: "Deposit Amount"
                                        }, void 0, false, {
                                            fileName: "[project]/app/market/[id]/page.tsx",
                                            lineNumber: 1509,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 px-4 py-3 rounded-lg border border-border bg-muted/30",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-muted-foreground",
                                                    children: "$"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/market/[id]/page.tsx",
                                                    lineNumber: 1513,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    value: depositAmount,
                                                    onChange: (e)=>setDepositAmount(e.target.value),
                                                    placeholder: "0.00",
                                                    className: "flex-1 bg-transparent text-foreground font-mono focus:outline-none placeholder-muted-foreground/50",
                                                    step: "0.01",
                                                    min: "0",
                                                    max: userBalance
                                                }, void 0, false, {
                                                    fileName: "[project]/app/market/[id]/page.tsx",
                                                    lineNumber: 1514,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/market/[id]/page.tsx",
                                            lineNumber: 1512,
                                            columnNumber: 15
                                        }, this),
                                        depositAmount && Number.parseFloat(depositAmount) > userBalance && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-red-600 dark:text-red-400 mt-2",
                                            children: [
                                                "Deposit amount exceeds your balance of $",
                                                userBalance.toFixed(2)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/market/[id]/page.tsx",
                                            lineNumber: 1526,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/market/[id]/page.tsx",
                                    lineNumber: 1508,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 rounded-lg border border-border bg-muted/20 space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm text-muted-foreground",
                                                    children: "Your Total Balance:"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/market/[id]/page.tsx",
                                                    lineNumber: 1533,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm font-semibold font-mono",
                                                    children: [
                                                        "$",
                                                        userBalance.toFixed(2)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/market/[id]/page.tsx",
                                                    lineNumber: 1534,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/market/[id]/page.tsx",
                                            lineNumber: 1532,
                                            columnNumber: 15
                                        }, this),
                                        tradingBalance > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between pt-2 border-t border-border/50",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm text-muted-foreground",
                                                    children: "Deposited for this market:"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/market/[id]/page.tsx",
                                                    lineNumber: 1538,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm font-semibold font-mono text-foreground",
                                                    children: [
                                                        "$",
                                                        tradingBalance.toFixed(2)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/market/[id]/page.tsx",
                                                    lineNumber: 1539,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/market/[id]/page.tsx",
                                            lineNumber: 1537,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "pt-2 border-t border-border/50",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-muted-foreground",
                                                children: "Note: Funds deposited here are only available for trading in this specific market question."
                                            }, void 0, false, {
                                                fileName: "[project]/app/market/[id]/page.tsx",
                                                lineNumber: 1543,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/market/[id]/page.tsx",
                                            lineNumber: 1542,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/market/[id]/page.tsx",
                                    lineNumber: 1531,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/market/[id]/page.tsx",
                            lineNumber: 1507,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogFooter"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setDepositDialogOpen(false),
                                    className: "px-4 py-2 text-sm font-medium rounded-lg hover:bg-muted transition-colors border border-border",
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/app/market/[id]/page.tsx",
                                    lineNumber: 1550,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: async ()=>{
                                        const amount = Number.parseFloat(depositAmount) || 0;
                                        if (amount > 0 && amount <= userBalance) {
                                            // Record transaction - Scenario 1: Deposit (this will trigger MetaMask)
                                            const tx = await recordTransaction({
                                                type: "deposit",
                                                marketId: marketId,
                                                marketQuestion: market?.question,
                                                amount: amount
                                            });
                                            // Only update balances if transaction was successful
                                            if (tx) {
                                                setTradingBalance((prev)=>prev + amount);
                                                // Deduct from wallet balance
                                                setUserBalance((prev)=>prev - amount);
                                                // VUSDC will be updated automatically via useEffect when tradingBalance changes
                                                setDepositAmount("");
                                                setDepositDialogOpen(false);
                                            }
                                        }
                                    },
                                    disabled: !depositAmount || Number.parseFloat(depositAmount) <= 0 || Number.parseFloat(depositAmount) > userBalance || isProcessingTransaction || !authenticated || !wallet,
                                    className: `px-4 py-2 text-sm font-medium rounded-lg transition-all ${depositAmount && Number.parseFloat(depositAmount) > 0 && Number.parseFloat(depositAmount) <= userBalance && !isProcessingTransaction ? "bg-foreground text-background hover:opacity-90" : "bg-muted text-muted-foreground cursor-not-allowed"}`,
                                    children: isProcessingTransaction ? "Processing Transaction..." : "Deposit"
                                }, void 0, false, {
                                    fileName: "[project]/app/market/[id]/page.tsx",
                                    lineNumber: 1556,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/market/[id]/page.tsx",
                            lineNumber: 1549,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/market/[id]/page.tsx",
                    lineNumber: 1500,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/market/[id]/page.tsx",
                lineNumber: 1499,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
                open: editDialogOpen,
                onOpenChange: setEditDialogOpen,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
                    className: "sm:max-w-md",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                    children: "Edit Trading Balance"
                                }, void 0, false, {
                                    fileName: "[project]/app/market/[id]/page.tsx",
                                    lineNumber: 1603,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                                    children: "Update your trading balance for this market"
                                }, void 0, false, {
                                    fileName: "[project]/app/market/[id]/page.tsx",
                                    lineNumber: 1604,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/market/[id]/page.tsx",
                            lineNumber: 1602,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4 py-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-sm font-medium text-muted-foreground uppercase tracking-widest block mb-2",
                                            children: "Trading Balance Amount"
                                        }, void 0, false, {
                                            fileName: "[project]/app/market/[id]/page.tsx",
                                            lineNumber: 1610,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 px-4 py-3 rounded-lg border border-border bg-muted/30",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-muted-foreground",
                                                    children: "$"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/market/[id]/page.tsx",
                                                    lineNumber: 1614,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    value: editAmount,
                                                    onChange: (e)=>setEditAmount(e.target.value),
                                                    placeholder: "0.00",
                                                    className: "flex-1 bg-transparent text-foreground font-mono focus:outline-none placeholder-muted-foreground/50",
                                                    step: "0.01",
                                                    min: "0",
                                                    max: userBalance + tradingBalance
                                                }, void 0, false, {
                                                    fileName: "[project]/app/market/[id]/page.tsx",
                                                    lineNumber: 1615,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/market/[id]/page.tsx",
                                            lineNumber: 1613,
                                            columnNumber: 15
                                        }, this),
                                        editAmount && Number.parseFloat(editAmount) > userBalance + tradingBalance && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-red-600 dark:text-red-400 mt-2",
                                            children: [
                                                "Amount exceeds available balance of $",
                                                (userBalance + tradingBalance).toFixed(2)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/market/[id]/page.tsx",
                                            lineNumber: 1627,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/market/[id]/page.tsx",
                                    lineNumber: 1609,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 rounded-lg border border-border bg-muted/20",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm text-muted-foreground",
                                                children: "Available Balance:"
                                            }, void 0, false, {
                                                fileName: "[project]/app/market/[id]/page.tsx",
                                                lineNumber: 1634,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-semibold font-mono",
                                                children: [
                                                    "$",
                                                    (userBalance + tradingBalance).toFixed(2)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/market/[id]/page.tsx",
                                                lineNumber: 1635,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/market/[id]/page.tsx",
                                        lineNumber: 1633,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/market/[id]/page.tsx",
                                    lineNumber: 1632,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/market/[id]/page.tsx",
                            lineNumber: 1608,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogFooter"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setEditDialogOpen(false),
                                    className: "px-4 py-2 text-sm font-medium rounded-lg hover:bg-muted transition-colors border border-border",
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/app/market/[id]/page.tsx",
                                    lineNumber: 1640,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        const amount = Number.parseFloat(editAmount) || 0;
                                        const currentTotal = userBalance + tradingBalance;
                                        if (amount >= 0 && amount <= currentTotal) {
                                            const difference = amount - tradingBalance;
                                            setTradingBalance(amount);
                                            // Adjust wallet balance based on difference
                                            if (difference > 0) {
                                                // Increasing trading balance - deduct from wallet
                                                setUserBalance((prev)=>Math.max(0, prev - difference));
                                            } else if (difference < 0) {
                                                // Decreasing trading balance - add back to wallet
                                                setUserBalance((prev)=>prev - difference);
                                            }
                                            // VUSDC will be updated automatically via useEffect when tradingBalance changes
                                            setEditAmount("");
                                            setEditDialogOpen(false);
                                        }
                                    },
                                    disabled: !editAmount || Number.parseFloat(editAmount) < 0 || Number.parseFloat(editAmount) > userBalance + tradingBalance,
                                    className: `px-4 py-2 text-sm font-medium rounded-lg transition-all ${editAmount && Number.parseFloat(editAmount) >= 0 && Number.parseFloat(editAmount) <= userBalance + tradingBalance ? "bg-foreground text-background hover:opacity-90" : "bg-muted text-muted-foreground cursor-not-allowed"}`,
                                    children: "Save"
                                }, void 0, false, {
                                    fileName: "[project]/app/market/[id]/page.tsx",
                                    lineNumber: 1646,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/market/[id]/page.tsx",
                            lineNumber: 1639,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/market/[id]/page.tsx",
                    lineNumber: 1601,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/market/[id]/page.tsx",
                lineNumber: 1600,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
                open: clearConfirmDialogOpen,
                onOpenChange: setClearConfirmDialogOpen,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
                    className: "sm:max-w-md",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                    children: "Clear Deposit"
                                }, void 0, false, {
                                    fileName: "[project]/app/market/[id]/page.tsx",
                                    lineNumber: 1683,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                                    children: "Are you sure you want to clear all deposited funds? This will reset your trading balance and all allocations."
                                }, void 0, false, {
                                    fileName: "[project]/app/market/[id]/page.tsx",
                                    lineNumber: 1684,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/market/[id]/page.tsx",
                            lineNumber: 1682,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4 py-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 rounded-lg border border-border bg-muted/20",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between mb-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm text-muted-foreground",
                                                    children: "Current Trading Balance:"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/market/[id]/page.tsx",
                                                    lineNumber: 1691,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm font-semibold font-mono",
                                                    children: [
                                                        "$",
                                                        tradingBalance.toFixed(2)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/market/[id]/page.tsx",
                                                    lineNumber: 1692,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/market/[id]/page.tsx",
                                            lineNumber: 1690,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm text-muted-foreground",
                                                    children: "Total Allocated:"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/market/[id]/page.tsx",
                                                    lineNumber: 1695,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm font-semibold font-mono",
                                                    children: [
                                                        "$",
                                                        totalAllocated.toFixed(2)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/market/[id]/page.tsx",
                                                    lineNumber: 1696,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/market/[id]/page.tsx",
                                            lineNumber: 1694,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/market/[id]/page.tsx",
                                    lineNumber: 1689,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-muted-foreground",
                                    children: "This action cannot be undone. All your allocations will be reset."
                                }, void 0, false, {
                                    fileName: "[project]/app/market/[id]/page.tsx",
                                    lineNumber: 1699,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/market/[id]/page.tsx",
                            lineNumber: 1688,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogFooter"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setClearConfirmDialogOpen(false),
                                    className: "px-4 py-2 text-sm font-medium rounded-lg hover:bg-muted transition-colors border border-border",
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/app/market/[id]/page.tsx",
                                    lineNumber: 1704,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        // Return trading balance back to wallet
                                        setUserBalance((prev)=>prev + tradingBalance);
                                        setTradingBalance(0);
                                        // Reset all allocations
                                        const resetAllocations = {};
                                        market.options.forEach((_, idx)=>{
                                            resetAllocations[idx] = {
                                                optionIndex: idx,
                                                selection: null,
                                                amount: 0,
                                                buySellMode: "buy"
                                            };
                                        });
                                        setAllocations(resetAllocations);
                                        setPlacedAllocations(new Set());
                                        // Clear bought positions
                                        setBoughtPositions([]);
                                        setClearConfirmDialogOpen(false);
                                    },
                                    className: "px-4 py-2 text-sm font-medium rounded-lg bg-red-600 dark:bg-red-500 text-white hover:opacity-90 transition-opacity",
                                    children: "Clear Deposit"
                                }, void 0, false, {
                                    fileName: "[project]/app/market/[id]/page.tsx",
                                    lineNumber: 1710,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/market/[id]/page.tsx",
                            lineNumber: 1703,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/market/[id]/page.tsx",
                    lineNumber: 1681,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/market/[id]/page.tsx",
                lineNumber: 1680,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/market/[id]/page.tsx",
        lineNumber: 587,
        columnNumber: 5
    }, this);
}
_s(MarketDetailPage, "IqK0a6j/QLpNmDdAAUMVapT9WPA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$useWallets$2d$DuxHKVvE$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__u__as__useWallets$3e$__["useWallets"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$usePrivy$2d$BSIhOAz8$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__u__as__usePrivy$3e$__["usePrivy"]
    ];
});
_c = MarketDetailPage;
var _c;
__turbopack_context__.k.register(_c, "MarketDetailPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_994355a0._.js.map