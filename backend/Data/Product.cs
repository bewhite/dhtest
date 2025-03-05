using Microsoft.EntityFrameworkCore;

namespace Data
{
    public class Product
    {
        public int ProductId { get; set; }
        virtual public Category Category { get; set; } = null!;
        public string Name { get; set; } = null!;
        public string ProductCode { get; set; } = null!;

        [Precision(18, 2)]
        public decimal Price { get; set; }
        public string SKU { get; set; } = null!;
        public int StockQuantity { get; set; }
        public DateTime DateAdded { get; set; }
    }
}
