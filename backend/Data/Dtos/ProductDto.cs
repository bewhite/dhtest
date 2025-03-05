namespace Data.Dtos
{
    public class ProductDto
    {
        public string CategoryName { get; set; } = null!;
        public string Name { get; set; } = null!;
        public string ProductCode { get; set; } = null!;
        public decimal Price { get; set; }
        public string SKU { get; set; } = null!;
        public int StockQuantity { get; set; }
        public DateTime DateAdded { get; set; }
    }
}
