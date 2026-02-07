

const Loading = () => {
    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh', 
            background: 'var(--bg-gradient)' 
        }}>
            <div className="loader"></div>
            <style>{`
                .loader {
                    width: 48px;
                    height: 48px;
                    border: 5px solid #FFF;
                    border-bottom-color: var(--primary);
                    border-radius: 50%;
                    display: inline-block;
                    box-sizing: border-box;
                    animation: rotation 1s linear infinite;
                }
                @keyframes rotation {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default Loading;
