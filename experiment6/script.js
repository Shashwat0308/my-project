document.addEventListener('DOMContentLoaded', () => {
    const svgCanvas = document.getElementById('drawing-canvas');

    
    let isDrawing = false;
    let currentPath = null;
    let pathData = '';

    const getMousePosition = (event) => {
        const rect = svgCanvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    };

    svgCanvas.addEventListener('mousedown', (event) => {
        isDrawing = true;
        const { x, y } = getMousePosition(event);

        
        pathData = M ${x} ${y};  

        currentPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        currentPath.setAttribute('d', pathData);
        currentPath.setAttribute('stroke', '#007bff');
        currentPath.setAttribute('stroke-width', '3');
        currentPath.setAttribute('fill', 'none');

        svgCanvas.appendChild(currentPath);
    });

    svgCanvas.addEventListener('mousemove', (event) => {
        if (!isDrawing) return;

        const { x, y } = getMousePosition(event);

        pathData += ` L ${x} ${y}`;

        currentPath.setAttribute('d', pathData);
    });

    svgCanvas.addEventListener('mouseup', () => {
        isDrawing = false;
        currentPath = null;
    });

    svgCanvas.addEventListener('mouseleave', () => {
        isDrawing = false;
        currentPath = null;
    });
});