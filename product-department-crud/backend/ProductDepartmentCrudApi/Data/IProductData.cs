using ProductDepartmentCrudApi.Model;
using ProductDepartmentCrudApi.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductDepartmentCrudApi.Data
{
    public interface IProductData
    {
        public List<ProductViewModel> GetAll();

        public List<Product> GetAllLazyLoading();

        public ProductViewModel GetById(int id);

        public Product Add(Product product);

        public Product Remove(int id);

        public Product Update(Product product);

        public void RemoveDepartmentToProduct(ProductDepartment productDepartment);

        public void AddDepartmentInProduct(ProductDepartment productDepartment); 
    }
}
