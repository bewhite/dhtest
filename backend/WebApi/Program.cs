using Data;
using Data.Dtos;
using Data.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ProductContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        b => b.MigrationsAssembly("WebApi")));

builder.Services.AddCors(o => o.AddDefaultPolicy(b =>
{
    b.WithOrigins(builder.Configuration["AllowedOrigins"]!.Split(','))
           .AllowAnyMethod()
           .AllowAnyHeader()
           .AllowCredentials();
}));

builder.Services.AddScoped<IProductRepository, ProductRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger(options => options.SerializeAsV2 = true);
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors();

app.MapGet("/products", async ([FromServices] IProductRepository productRepository) =>
{
    var products = await productRepository.GetProductsAsync();

    return products.Select(p => new WebApi.Model.Product
    {
        CategoryName = p.CategoryName,
        Name = p.Name,
        ProductCode = p.ProductCode,
        Price = p.Price,
        SKU = p.SKU,
        StockQuantity = p.StockQuantity,
        DateAdded = p.DateAdded
    }).ToList();
})
.WithName("GetProducts")
.WithOpenApi();

app.MapPost("/products", async ([FromBody] WebApi.Model.Product product, [FromServices] IProductRepository productRepository) =>
{
    await productRepository.AddProductAsync(new ProductDto
    {
        CategoryName = product.CategoryName,
        Name = product.Name,
        ProductCode = product.ProductCode,
        Price = product.Price,
        SKU = product.SKU,
        StockQuantity = product.StockQuantity,
        DateAdded = product.DateAdded
    });

    return Results.Created($"/products/{product.ProductCode}", product);
})
.WithName("PostProduct")
.WithOpenApi();

app.Run();
