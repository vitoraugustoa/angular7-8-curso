using ProductDepartmentCrudApi.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductDepartmentCrudApi.ViewModel
{
    public class ProductWithDepartmentsViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int Stock { get; set; }

        public List<Department> Departments { get; set; }
    }
}
