const spinner=[{
        display: 'flex',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center'
    },
    {
        border: '8px solid #52b084',
        borderTop: '8px solid #52b084', 
        borderRadius: '50%', 
        height: '12rem',
        width: '12rem',
        marginRight: '0.75rem', 
        borderColor: '#D1E7D7', 
        animation: 'spin 1s linear infinite'
    }
]


export const Loading=()=>{

    return (
        <div
            style={spinner[0]}
        >
            <div
                style={spinner[1]}
            >
            </div>
        </div>
    )
  
}