using System;
using System.Collections.Generic;

namespace ProductDepartmentCrudApi.Model
{
    public partial class Product
    {
        public Product()
        {
            this.ProductDepartments = new HashSet<ProductDepartment>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public decimal? Price { get; set; }
        public int? Stock { get; set; }

        public virtual ICollection<ProductDepartment> ProductDepartments { get; set; }
    }
}
