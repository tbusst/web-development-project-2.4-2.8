// Export the placeholder page
export default function Placeholder() {
    return (
        <main className='Placeholder'>
            <h1>Placeholder</h1>
            {/* Go back to last page */}
            <button
                onClick={
                    () => window.history.back()
                }
            >Return</button>
        </main>
    );
};