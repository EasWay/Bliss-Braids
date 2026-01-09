'use client';

import React, { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="mb-6">
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
              
              <h1 className="text-2xl font-bold text-charcoal mb-2">
                Something went wrong
              </h1>
              
              <p className="text-slate">
                We encountered an unexpected error. Please try refreshing the page or go back to the homepage.
              </p>
            </div>

            {/* Error details in development */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mb-6 p-4 bg-gray-100 rounded-lg text-left">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  Error Details (Development Only):
                </h3>
                <pre className="text-xs text-gray-600 overflow-auto max-h-32">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </div>
            )}

            <div className="space-y-3">
              <button
                onClick={this.handleRetry}
                className="w-full bg-primary text-white py-3 px-6 rounded-full font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Try Again
              </button>
              
              <button
                onClick={this.handleGoHome}
                className="w-full bg-gray-100 text-charcoal py-3 px-6 rounded-full font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
              >
                <Home className="h-4 w-4" />
                Go to Homepage
              </button>
            </div>

            <p className="text-xs text-slate mt-6">
              If this problem persists, please contact us via WhatsApp
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook-based error boundary for functional components
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorFallback?: ReactNode,
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
) {
  return function WrappedComponent(props: P) {
    return (
      <ErrorBoundary fallback={errorFallback} onError={onError}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}

// Simple error fallback component for specific sections
export function ErrorFallback({ 
  error, 
  resetError, 
  title = "Something went wrong",
  message = "Please try again or refresh the page"
}: {
  error?: Error;
  resetError?: () => void;
  title?: string;
  message?: string;
}) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
      <div className="mb-4">
        <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-red-800 mb-2">
          {title}
        </h3>
        <p className="text-red-700 text-sm">
          {message}
        </p>
      </div>

      {resetError && (
        <button
          onClick={resetError}
          className="bg-red-600 text-white py-2 px-4 rounded-full text-sm font-medium hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      )}

      {process.env.NODE_ENV === 'development' && error && (
        <details className="mt-4 text-left">
          <summary className="text-xs text-red-600 cursor-pointer">
            Error Details (Development)
          </summary>
          <pre className="text-xs text-red-600 mt-2 overflow-auto max-h-32 bg-red-100 p-2 rounded">
            {error.toString()}
          </pre>
        </details>
      )}
    </div>
  );
}