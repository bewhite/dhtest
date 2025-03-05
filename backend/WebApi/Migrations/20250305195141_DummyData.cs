using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApi.Migrations
{
    /// <inheritdoc />
    public partial class DummyData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Category",
                columns: new[] { "CategoryId", "Name" },
                values: new object[,]
                {
                    { 1, "Electronics" },
                    { 2, "Clothing" },
                    { 3, "Books" },
                    { 4, "Home" }
                });

            migrationBuilder.InsertData(
                table: "Product",
                columns: new[] { "ProductId", "CategoryId", "Name", "ProductCode", "Price", "SKU", "StockQuantity", "DateAdded" },
                values: new object[,]
                {
                    { 1, 1, "Laptop", "LAP001", 1000m, "LAP001", 10, new DateTime(2025, 3, 5, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 2, 1, "Smartphone", "SP001", 500m, "SP001", 20, new DateTime(2024, 3, 5, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 3, 2, "T-Shirt", "TS001", 20m, "TS001", 30, new DateTime(2023, 3, 5, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 4, 2, "Jeans", "JN001", 50m, "JN001", 40, new DateTime(2022, 3, 5, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 5, 3, "C# Programming", "C#001", 30m, "C#001", 50, new DateTime(2022, 3, 5, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 6, 3, "ASP.NET Core", "ASP001", 40m, "ASP001", 60, new DateTime(2023, 3, 5, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 7, 4, "Sofa", "SF001", 200m, "SF001", 70, new DateTime(2024, 3, 5, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 8, 4, "Table", "TB001", 100m, "TB001", 80, new DateTime(2025, 3, 5, 0, 0, 0, 0, DateTimeKind.Unspecified) }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
