(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/providers.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Providers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$index$2d$CCrVHfyv$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__H__as__PrivyProvider$3e$__ = __turbopack_context__.i("[project]/node_modules/@privy-io/react-auth/dist/esm/index-CCrVHfyv.mjs [app-client] (ecmascript) <export H as PrivyProvider>");
"use client";
;
;
function Providers({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$index$2d$CCrVHfyv$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__H__as__PrivyProvider$3e$__["PrivyProvider"], {
        appId: "cmiucx9ou001tk00btw1n4o47",
        config: {
            // Customize Privy's appearance
            appearance: {
                theme: "light",
                accentColor: "#676FFF",
                logo: "https://your-logo-url"
            },
            // Create embedded wallets for users who don't have a wallet
            embeddedWallets: {
                ethereum: {
                    createOnLogin: "users-without-wallets"
                }
            },
            loginMethods: [
                "email",
                "wallet",
                "google",
                "sms"
            ]
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/app/providers.tsx",
        lineNumber: 7,
        columnNumber: 9
    }, this);
}
_c = Providers;
var _c;
__turbopack_context__.k.register(_c, "Providers");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_providers_tsx_7ef36779._.js.map