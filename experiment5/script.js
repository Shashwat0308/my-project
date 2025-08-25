document.addEventListener('DOMContentLoaded', () => {

    
    const categoryFilter = document.getElementById('category-filter');
    const productItems = document.querySelectorAll('.product-item');


    categoryFilter.addEventListener('change', () => {
        const selectedCategory = categoryFilter.value;


        productItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');

            if (selectedCategory === 'all' || selectedCategory === itemCategory) {

                item.classList.remove('hide');
            } else {

                item.classList.add('hide');
            }
        });
    });
});