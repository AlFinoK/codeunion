import { Component, ErrorInfo, ReactNode, Suspense } from 'react'
import { Loader } from 'shared/ui/Loader'
import { PageError } from 'widgets/PageError'

interface ErrorBoundaryProps {
    children: ReactNode
}

interface ErrorBoundaryState {
    hasError: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(_error: Error) {
        return { hasError: true }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.log(error, errorInfo)
    }

    render() {
        const { hasError } = this.state
        const { children } = this.props
        if (hasError) {
            return (
                <Suspense fallback={<Loader />}>
                    <PageError />
                </Suspense>
            )
        }

        return children
    }
}

export default ErrorBoundary
