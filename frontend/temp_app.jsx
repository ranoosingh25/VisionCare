import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/App.jsx");const _jsxDEV = __vite__cjsImport12_react_jsxDevRuntime["jsxDEV"]; const _Fragment = __vite__cjsImport12_react_jsxDevRuntime["Fragment"];import { Routes, Route } from "/node_modules/.vite/deps/react-router-dom.js?v=1a61d018";
import Navbar from "/src/components/Navbar.jsx";
import Footer from "/src/components/Footer.jsx";
// Pages import
import Home from "/src/pages/Home.jsx";
import Login from "/src/pages/Login.jsx";
import Donate from "/src/pages/Donate.jsx";
import Appointment from "/src/pages/Appointment.jsx";
import Treatments from "/src/pages/Treatments.jsx";
import Doctors from "/src/pages/Doctors.jsx";
import Events from "/src/pages/Events.jsx";
import Contact from "/src/pages/Contact.jsx";
import Aboutus from "/src/pages/Aboutus.jsx";
var _jsxFileName = "C:/Users/HP/OneDrive/Documents/visioncare-charity/frontend/src/App.jsx";
import __vite__cjsImport12_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=cbf7d47c";
function App() {
	return /* @__PURE__ */ _jsxDEV(_Fragment, { children: [
		/* @__PURE__ */ _jsxDEV(Navbar, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 21,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ _jsxDEV("main", {
			className: "page-content",
			children: /* @__PURE__ */ _jsxDEV(Routes, { children: [
				/* @__PURE__ */ _jsxDEV(Route, {
					path: "/",
					element: /* @__PURE__ */ _jsxDEV(Home, {}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 24,
						columnNumber: 36
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 24,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ _jsxDEV(Route, {
					path: "/login",
					element: /* @__PURE__ */ _jsxDEV(Login, {}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 25,
						columnNumber: 41
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 25,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ _jsxDEV(Route, {
					path: "/donate",
					element: /* @__PURE__ */ _jsxDEV(Donate, {}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 26,
						columnNumber: 42
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 26,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ _jsxDEV(Route, {
					path: "/appointment",
					element: /* @__PURE__ */ _jsxDEV(Appointment, {}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 27,
						columnNumber: 47
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 27,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ _jsxDEV(Route, {
					path: "/aboutus",
					element: /* @__PURE__ */ _jsxDEV(Aboutus, {}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 28,
						columnNumber: 43
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 28,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ _jsxDEV(Route, {
					path: "/treatments",
					element: /* @__PURE__ */ _jsxDEV(Treatments, {}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 29,
						columnNumber: 46
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 29,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ _jsxDEV(Route, {
					path: "/doctors",
					element: /* @__PURE__ */ _jsxDEV(Doctors, {}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 30,
						columnNumber: 43
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 30,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ _jsxDEV(Route, {
					path: "/events",
					element: /* @__PURE__ */ _jsxDEV(Events, {}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 31,
						columnNumber: 42
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 31,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ _jsxDEV(Route, {
					path: "/contact",
					element: /* @__PURE__ */ _jsxDEV(Contact, {}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 32,
						columnNumber: 43
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 32,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ _jsxDEV(Route, {
					path: "*",
					element: /* @__PURE__ */ _jsxDEV(Home, {}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 33,
						columnNumber: 36
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 33,
					columnNumber: 11
				}, this)
			] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 23,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 22,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ _jsxDEV(Footer, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 36,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 20,
		columnNumber: 5
	}, this);
}
_c = App;
export default App;
var _c;
$RefreshReg$(_c, "App");
import * as RefreshRuntime from "/@react-refresh";
const inWebWorker = typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope;
import * as __vite_react_currentExports from "/src/App.jsx";
if (import.meta.hot && !inWebWorker) {
  if (!window.$RefreshReg$) {
    throw new Error(
      "@vitejs/plugin-react can't detect preamble. Something is wrong."
    );
  }

  const currentExports = __vite_react_currentExports;
  queueMicrotask(() => {
    RefreshRuntime.registerExportsForReactRefresh("C:/Users/HP/OneDrive/Documents/visioncare-charity/frontend/src/App.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("C:/Users/HP/OneDrive/Documents/visioncare-charity/frontend/src/App.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}
function $RefreshReg$(type, id) { return RefreshRuntime.register(type, "C:/Users/HP/OneDrive/Documents/visioncare-charity/frontend/src/App.jsx" + ' ' + id); }
function $RefreshSig$() { return RefreshRuntime.createSignatureFunctionForTransform(); }

//# sourceMappingURL=data:application/json;base64,eyJtYXBwaW5ncyI6IkFBQUEsU0FBUyxRQUFRLGFBQWE7QUFDOUIsT0FBTyxZQUFZO0FBQ25CLE9BQU8sWUFBWTs7QUFHbkIsT0FBTyxVQUFVO0FBQ2pCLE9BQU8sV0FBVztBQUNsQixPQUFPLFlBQVk7QUFDbkIsT0FBTyxpQkFBaUI7QUFDeEIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxhQUFhO0FBQ3BCLE9BQU8sWUFBWTtBQUNuQixPQUFPLGFBQWE7QUFDcEIsT0FBTyxhQUFhOzs7QUFJcEIsU0FBUyxNQUFNO0NBQ2IsT0FDRTtFQUNFLHdCQUFDLFFBQUQsQ0FBUzs7Ozs7RUFDVCx3QkFBQyxRQUFEO0dBQU0sV0FBVTthQUNkLHdCQUFDLFFBQUQ7SUFDRSx3QkFBQyxPQUFEO0tBQU8sTUFBSztLQUFJLFNBQVMsd0JBQUMsTUFBRCxDQUFPOzs7OztJQUFJOzs7OztJQUNwQyx3QkFBQyxPQUFEO0tBQU8sTUFBSztLQUFTLFNBQVMsd0JBQUMsT0FBRCxDQUFROzs7OztJQUFJOzs7OztJQUMxQyx3QkFBQyxPQUFEO0tBQU8sTUFBSztLQUFVLFNBQVMsd0JBQUMsUUFBRCxDQUFTOzs7OztJQUFJOzs7OztJQUM1Qyx3QkFBQyxPQUFEO0tBQU8sTUFBSztLQUFlLFNBQVMsd0JBQUMsYUFBRCxDQUFjOzs7OztJQUFJOzs7OztJQUN0RCx3QkFBQyxPQUFEO0tBQU8sTUFBSztLQUFXLFNBQVMsd0JBQUMsU0FBRCxDQUFVOzs7OztJQUFJOzs7OztJQUM5Qyx3QkFBQyxPQUFEO0tBQU8sTUFBSztLQUFjLFNBQVMsd0JBQUMsWUFBRCxDQUFhOzs7OztJQUFJOzs7OztJQUNwRCx3QkFBQyxPQUFEO0tBQU8sTUFBSztLQUFXLFNBQVMsd0JBQUMsU0FBRCxDQUFVOzs7OztJQUFJOzs7OztJQUM5Qyx3QkFBQyxPQUFEO0tBQU8sTUFBSztLQUFVLFNBQVMsd0JBQUMsUUFBRCxDQUFTOzs7OztJQUFJOzs7OztJQUM1Qyx3QkFBQyxPQUFEO0tBQU8sTUFBSztLQUFXLFNBQVMsd0JBQUMsU0FBRCxDQUFVOzs7OztJQUFJOzs7OztJQUM5Qyx3QkFBQyxPQUFEO0tBQU8sTUFBSztLQUFJLFNBQVMsd0JBQUMsTUFBRCxDQUFPOzs7OztJQUFJOzs7OztHQUM5Qjs7Ozs7RUFDSjs7Ozs7RUFDTix3QkFBQyxRQUFELENBQVM7Ozs7O0NBQ1Q7Ozs7O0FBRU47O0FBRUEsZUFBZSIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJBcHAuanN4Il0sInZlcnNpb24iOjMsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvdXRlcywgUm91dGUgfSBmcm9tIFwicmVhY3Qtcm91dGVyLWRvbVwiO1xuaW1wb3J0IE5hdmJhciBmcm9tIFwiLi9jb21wb25lbnRzL05hdmJhclwiO1xuaW1wb3J0IEZvb3RlciBmcm9tIFwiLi9jb21wb25lbnRzL0Zvb3RlclwiO1xuXG4vLyBQYWdlcyBpbXBvcnRcbmltcG9ydCBIb21lIGZyb20gXCIuL3BhZ2VzL0hvbWVcIjtcbmltcG9ydCBMb2dpbiBmcm9tIFwiLi9wYWdlcy9Mb2dpblwiO1xuaW1wb3J0IERvbmF0ZSBmcm9tIFwiLi9wYWdlcy9Eb25hdGVcIjtcbmltcG9ydCBBcHBvaW50bWVudCBmcm9tIFwiLi9wYWdlcy9BcHBvaW50bWVudFwiO1xuaW1wb3J0IFRyZWF0bWVudHMgZnJvbSBcIi4vcGFnZXMvVHJlYXRtZW50c1wiO1xuaW1wb3J0IERvY3RvcnMgZnJvbSBcIi4vcGFnZXMvRG9jdG9yc1wiO1xuaW1wb3J0IEV2ZW50cyBmcm9tIFwiLi9wYWdlcy9FdmVudHNcIjtcbmltcG9ydCBDb250YWN0IGZyb20gXCIuL3BhZ2VzL0NvbnRhY3RcIjtcbmltcG9ydCBBYm91dHVzIGZyb20gXCIuL3BhZ2VzL0Fib3V0dXNcIjtcblxuXG5cbmZ1bmN0aW9uIEFwcCgpIHtcbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPE5hdmJhciAvPlxuICAgICAgPG1haW4gY2xhc3NOYW1lPVwicGFnZS1jb250ZW50XCI+XG4gICAgICAgIDxSb3V0ZXM+XG4gICAgICAgICAgPFJvdXRlIHBhdGg9XCIvXCIgZWxlbWVudD17PEhvbWUgLz59IC8+XG4gICAgICAgICAgPFJvdXRlIHBhdGg9XCIvbG9naW5cIiBlbGVtZW50PXs8TG9naW4gLz59IC8+XG4gICAgICAgICAgPFJvdXRlIHBhdGg9XCIvZG9uYXRlXCIgZWxlbWVudD17PERvbmF0ZSAvPn0gLz5cbiAgICAgICAgICA8Um91dGUgcGF0aD1cIi9hcHBvaW50bWVudFwiIGVsZW1lbnQ9ezxBcHBvaW50bWVudCAvPn0gLz5cbiAgICAgICAgICA8Um91dGUgcGF0aD1cIi9hYm91dHVzXCIgZWxlbWVudD17PEFib3V0dXMgLz59IC8+XG4gICAgICAgICAgPFJvdXRlIHBhdGg9XCIvdHJlYXRtZW50c1wiIGVsZW1lbnQ9ezxUcmVhdG1lbnRzIC8+fSAvPlxuICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiL2RvY3RvcnNcIiBlbGVtZW50PXs8RG9jdG9ycyAvPn0gLz5cbiAgICAgICAgICA8Um91dGUgcGF0aD1cIi9ldmVudHNcIiBlbGVtZW50PXs8RXZlbnRzIC8+fSAvPlxuICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiL2NvbnRhY3RcIiBlbGVtZW50PXs8Q29udGFjdCAvPn0gLz5cbiAgICAgICAgICA8Um91dGUgcGF0aD1cIipcIiBlbGVtZW50PXs8SG9tZSAvPn0gLz5cbiAgICAgICAgPC9Sb3V0ZXM+XG4gICAgICA8L21haW4+XG4gICAgICA8Rm9vdGVyIC8+XG4gICAgPC8+XG4gICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFwcDtcbiJdfQ==
