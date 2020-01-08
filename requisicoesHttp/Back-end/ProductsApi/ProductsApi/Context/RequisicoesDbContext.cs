using Microsoft.EntityFrameworkCore;
using ProductsApi.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductsApi.Context
{
    public class RequisicoesDbContext : DbContext
    {
        public RequisicoesDbContext(DbContextOptions<RequisicoesDbContext> options) : base(options) {}

        public DbSet<Products> Products { get; set; }
    }
}
