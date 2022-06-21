export default function Placeholder() {
    return (
        <main className='Placeholder'>
            <h1>Placeholder</h1>
            <button
                onClick={
                    () => window.history.back()
                }
            >Return</button>
        </main>
    );
};