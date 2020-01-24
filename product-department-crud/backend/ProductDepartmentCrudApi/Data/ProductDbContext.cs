using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using ProductDepartmentCrudApi.Model;

namespace ProductDepartmentCrudApi.Model
{
    public partial class ProductDbContext : DbContext
    {
        public ProductDbContext()
        {
        }

        public ProductDbContext(DbContextOptions<ProductDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Department> Department { get; set; }
        public virtual DbSet<Product> Product { get; set; }
        public virtual DbSet<ProductDepartment> ProductDepartment { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Department>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Price).HasColumnType("decimal(10, 2)");
            });

            modelBuilder.Entity<ProductDepartment>(entity =>
            {
                entity.HasKey(pd => new { pd.ProductId, pd.DepartmentId });

                entity.HasOne(d => d.Department)
                    .WithMany(p => p.ProductDepartment)
                    .HasForeignKey(d => d.DepartmentId);

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.ProductDepartments)
                    .HasForeignKey(d => d.ProductId);
            });
        }
    }
}
