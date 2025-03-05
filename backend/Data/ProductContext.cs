using Microsoft.EntityFrameworkCore;

namespace Data
{
    public class ProductContext : DbContext
    {
        public ProductContext(DbContextOptions<ProductContext> options)
            : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>()
                .HasIndex(p => p.ProductCode)
                .IsUnique();

            modelBuilder.Entity<Product>()
                .HasIndex(p => p.SKU)
                .IsUnique();

            modelBuilder.Entity<Product>()
                .ToTable("Product");

            modelBuilder.Entity<Category>()
                .HasIndex(p => p.Name)
                .IsUnique();

            modelBuilder.Entity<Category>()
                .ToTable("Category");
        }
    }
}
