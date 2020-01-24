using ProductDepartmentCrudApi.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductDepartmentCrudApi.ViewModel
{
    public class ProductViewModel
    {
        public Product Produto { get; set; }

        public List<Department> Departments { get; set; } 
    }
}
