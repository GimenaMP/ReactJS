import React from "react";

const OptimizedImage = React.memo(({ src, alt, ...props }) => {

    const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, ".webp");

    return (
        <picture>
            <source srcSet={webpSrc} type="image/webp" />
            <img
                src={src}
                alt={alt}
                loading="lazy"
                decoding="async"
                {...props}
            />
        </picture>
    );
});

export default OptimizedImage;
