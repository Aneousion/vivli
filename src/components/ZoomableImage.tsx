'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

interface ZoomableImageProps {
    src: string
    alt: string
}

export function ZoomableImage({ src, alt }: ZoomableImageProps) {
    const [dragging, setDragging] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLImageElement>(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const scale = useMotionValue(1)

    useEffect(() => {
        const container = containerRef.current
        const image = imageRef.current
        if (container && image) {
            const containerAspectRatio = container.clientWidth / container.clientHeight
            const imageAspectRatio = image.naturalWidth / image.naturalHeight
            if (containerAspectRatio > imageAspectRatio) {
                image.style.height = '100%'
                image.style.width = 'auto'
            } else {
                image.style.width = '100%'
                image.style.height = 'auto'
            }
        }
    }, [src])

    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault()
        const newScale = Math.min(Math.max(scale.get() - e.deltaY * 0.01, 1), 5)
        scale.set(newScale)

        if (newScale === 1) {
            x.set(0)
            y.set(0)
        }
    }

    const handleDragEnd = () => {
        setDragging(false)
    }

    const handleClick = (event: React.MouseEvent<HTMLImageElement>) => {
        if (dragging) return

        const image = imageRef.current
        const container = containerRef.current
        if (!image || !container) return

        const rect = image.getBoundingClientRect()
        const offsetX = event.clientX - rect.left
        const offsetY = event.clientY - rect.top

        const centerX = container.clientWidth / 2
        const centerY = container.clientHeight / 2

        if (scale.get() === 1) {
            scale.set(2)
            x.set(centerX - offsetX * 2)
            y.set(centerY - offsetY * 2)
        } else {
            scale.set(1)
            x.set(0)
            y.set(0)
        }
    }

    const constraintsRef = useRef(null)

    const xConstraint: any = useTransform(scale, [1, 5], [0, -1000])
    const yConstraint: any = useTransform(scale, [1, 5], [0, -1000])

    return (
        <div 
            ref={containerRef}
            className="w-full h-full overflow-hidden cursor-move" 
            onWheel={handleWheel}
        >
            <motion.div ref={constraintsRef} className="w-full h-full">
                <motion.img
                    ref={imageRef}
                    src={src}
                    alt={alt}
                    className="object-contain"
                    drag
                    dragConstraints={{
                        left: xConstraint,
                        right: -xConstraint,
                        top: yConstraint,
                        bottom: -yConstraint
                    }}
                    dragElastic={0.1}
                    onDragStart={() => setDragging(true)}
                    onDragEnd={handleDragEnd}
                    onClick={handleClick}
                    style={{ x, y, scale, originX: 0, originY: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
            </motion.div>
        </div>
    )
}