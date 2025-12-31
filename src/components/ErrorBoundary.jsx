import { Component } from 'react';

export class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-red-50 p-6 text-red-900 font-mono">
                    <div className="max-w-4xl w-full bg-white p-8 rounded-xl shadow-2xl border border-red-200">
                        <h1 className="text-3xl font-bold mb-4 text-red-600 flex items-center gap-2">
                            ⚠️ Application Crashed
                        </h1>
                        <div className="bg-red-100 p-4 rounded-lg mb-6 border border-red-200">
                            <p className="font-bold text-lg mb-2">{this.state.error && this.state.error.toString()}</p>
                            <pre className="text-xs overflow-auto max-h-64 whitespace-pre-wrap">{this.state.errorInfo && this.state.errorInfo.componentStack}</pre>
                        </div>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Reload Application
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
