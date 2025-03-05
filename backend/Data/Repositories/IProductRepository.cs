using Data.Dtos;

namespace Data.Repositories
{
    public interface IProductRepository
    {
        Task<IEnumerable<ProductDto>> GetProductsAsync();
        Task AddProductAsync(ProductDto product);
    }
}
