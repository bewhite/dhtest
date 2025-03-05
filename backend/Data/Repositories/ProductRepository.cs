
using Data.Dtos;
using Microsoft.EntityFrameworkCore;

namespace Data.Repositories
{
    public class ProductRepository(ProductContext productContext) : IProductRepository
    {
        public async Task AddProductAsync(ProductDto product)
        {
            var category = await productContext.Categories.FirstOrDefaultAsync(c => c.Name == product.CategoryName);
            if (category == null)
            {
                category = new Category { Name = product.CategoryName };
                productContext.Categories.Add(category);
            }

            productContext.Products.Add(new Product
            {
                Name = product.Name,
                Category = category,
                DateAdded = product.DateAdded,
                Price = product.Price,
                ProductCode = product.ProductCode,
                SKU = product.SKU,
                StockQuantity = product.StockQuantity
            });

            await productContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<ProductDto>> GetProductsAsync()
        {
            return await productContext.Products.AsNoTracking()
                .Include(p => p.Category)
                .Select(p => new ProductDto
                {
                    CategoryName = p.Category.Name,
                    Name = p.Name,
                    ProductCode = p.ProductCode,
                    Price = p.Price,
                    SKU = p.SKU,
                    StockQuantity = p.StockQuantity,
                    DateAdded = p.DateAdded
                })
                .OrderBy(p => p.Name)
                .ToListAsync();
        }
    }
}
