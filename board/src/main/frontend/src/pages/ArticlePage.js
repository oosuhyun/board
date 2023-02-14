import React from 'react';
import {Alert} from "react-bootstrap";

function ArticlePage() {
    return (
        <>
            {[
                'primary'
            ].map((variant) => (
                <Alert key={variant} variant={variant}>
                    수정 완료
                </Alert>
            ))}
        </>
    );
}

export default ArticlePage;


