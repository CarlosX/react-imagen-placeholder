import React, { Fragment, useEffect, useRef } from 'react';
import { ImagenLoaderProps } from './types';

const ImagenLoader = ({
  src,
  alt,
  width,
  height,
  imgClassName = '',
  placeHolder = true,
  placeHolderClassName = '',
  lazyLoad = false,
}: ImagenLoaderProps) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [isMounted, setMounted] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);

  const renderImagen = () => {
    setMounted(true);
    if (imgRef.current) {
      if (imgRef.current.complete) {
        setLoaded(true);
      } else {
        imgRef.current.addEventListener('load', () => {
          setLoaded(true);
        });
      }
    }
  };

  useEffect(renderImagen, [imgRef, isMounted]);

  return (
    <Fragment>
      <div
        style={{
          filter: loaded === false ? 'blur(10px)' : 'blur(0px)',
          width: '100%',
          height: 'auto',
        }}
        className={placeHolder ? placeHolderClassName : ''}
      >
        <img
          decoding="async"
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={imgClassName}
          //https://web.dev/browser-level-image-lazy-loading/
          {...(lazyLoad && {
            loading: 'lazy',
          })}
          style={
            loaded === false
              ? {
                  //https://www.industrialempathy.com/posts/image-optimizations/#blurry-placeholder
                  backgroundSize: 'cover',
                  maxWidth: '1600px',
                  backgroundImage: loaded
                    ? 'none'
                    : "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 10 6'%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='.5'%3E%3C/feGaussianBlur%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='1 1'%3E%3C/feFuncA%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Cimage filter='url(%23b)' x='0' y='0' height='100%25' width='100%25' xlink:href='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAA70lEQVR4AQXBTUvCcADA4Z/7z9xcmbEpdSg6CBYGRUcr6WJvUESfqHN07Jt47hBdBV/AFg2FYTGd2DZzmJiz54ndnpUX51cldvcvSWoqufwGcVlgmlX01CpLmsbD4xMiZ2zeS8MQNRgQX1Gweg6/owGvLxUyxjq2+4VtO8haPIGKxKfdxfpzmUgKruMSxX4QiqDfs2i1A+RwMmM+hsr4nbSvcnNaZHnqE8yTNDpvROGU7FYSueX3MUcuqbUExYsd9jICY66yyOrUm22aHY/vmYec304jRIRuaJROjmg8V/G8IXflawoHhxx/1KjVu/wDycJbrJ7yuz0AAAAASUVORK5CYII='%3E%3C/image%3E%3C/svg%3E\")",
                }
              : {}
          }
          ref={imgRef}
        />
      </div>
    </Fragment>
  );
};

export default ImagenLoader;
