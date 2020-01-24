using Microsoft.EntityFrameworkCore;
using ProductDepartmentCrudApi.Model;
using ProductDepartmentCrudApi.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductDepartmentCrudApi.Data
{
    public class ProductData : IProductData
    {
        private readonly ProductDbContext _productContext;
        public ProductData(ProductDbContext productContext)
        {
            _productContext = productContext;
        }

        public Product Add(Product product)
        {
            try
            {
                _productContext.Product.Add(product);
                _productContext.SaveChanges();

                if (product.ProductDepartments != null)
                {
                    foreach (var pd in product.ProductDepartments)
                    {
                        _productContext.ProductDepartment.Add(pd);
                    }
                }

                _productContext.SaveChanges();
                return product;
            }
            catch (Exception ex)
            {
                if (ex.InnerException != null)
                    throw ex.InnerException;
                else
                    throw ex;
            }
        }

        public void AddDepartmentInProduct(ProductDepartment productDepartment)
        {
            try
            {
                _productContext.ProductDepartment.Add(productDepartment);
                _productContext.SaveChanges();
            }
            catch (Exception ex)
            {
                if (ex.InnerException != null)
                    throw ex.InnerException;
                else
                    throw ex;
            }
        }

        public List<ProductViewModel> GetAll()
        {
            try
            {
                List<ProductViewModel> produtosTest = new List<ProductViewModel>();
                List<Product> produtos = _productContext.Product.ToList();
                foreach(var produto in produtos)
                {
                    produtosTest.Add(new ProductViewModel
                    {
                        Produto = produto,
                        Departments = _productContext.ProductDepartment.Where(pd => pd.ProductId == produto.Id).Select(d => d.Department).ToList()
                    });
                }
                return produtosTest;
            }
            catch (Exception ex)
            {
                if (ex.InnerException != null)
                    throw ex.InnerException;
                else
                    throw ex;
            }
        }

        public List<Product> GetAllLazyLoading()
        {
            try
            {
                List<Product> products = _productContext.Product.Include(p => p.ProductDepartments).ToList();
                return products;
            }
            catch (Exception ex)
            {
                if (ex.InnerException != null)
                    throw ex.InnerException;
                else
                    throw ex;
            }
        }

        public ProductViewModel GetById(int id)
        {
            try
            {
                ProductViewModel productViewModel = new ProductViewModel();
                productViewModel.Produto = _productContext.Product
                    .Where(p => p.Id == id)
                    .FirstOrDefault();

                productViewModel.Departments = _productContext.ProductDepartment.Where(p => p.ProductId == id).Select(p => p.Department).ToList();

                if (productViewModel == null)
                    throw new Exception("Produto não encontrado.");

                return productViewModel;
            }
            catch (Exception ex)
            {
                if (ex.InnerException != null)
                    throw ex.InnerException;
                else
                    throw ex;
            }
        }

        public Product Remove(int id)
        {
            try
            {
                Product product = _productContext.Product.Find(id);

                if (product == null)
                    throw new Exception("Produto não encontrado.");

                _productContext.Product.Remove(product);
                _productContext.SaveChanges();
                return product;
            }
            catch (Exception ex)
            {
                if (ex.InnerException != null)
                    throw ex.InnerException;
                else
                    throw ex;
            }
        }

        public void RemoveDepartmentToProduct(ProductDepartment productDepartment)
        {
            try
            {
                var productDepartmentToRemove = _productContext.ProductDepartment
                     .Where(pd => pd.DepartmentId == productDepartment.DepartmentId && pd.ProductId == productDepartment.ProductId).FirstOrDefault();

                if (productDepartmentToRemove == null)
                    throw new Exception("ProductDepartment não encontrado.");

                _productContext.ProductDepartment.Remove(productDepartmentToRemove);
                _productContext.SaveChanges();
            }
            catch (Exception ex)
            {
                if (ex.InnerException != null)
                    throw ex.InnerException;
                else
                    throw ex;
            }
        }

        public Product Update(Product product)
        {
            try
            {
                _productContext.Product.Update(product);
                _productContext.SaveChanges();

                if (product.ProductDepartments != null)
                {
                    foreach (var pd in product.ProductDepartments)
                    {
                        _productContext.ProductDepartment.Update(pd);
                    }
                }

                _productContext.SaveChanges();
                return product;
            }
            catch (Exception ex)
            {
                if (ex.InnerException != null)
                    throw ex.InnerException;
                else
                    throw ex;
            }
        }
    }
}
