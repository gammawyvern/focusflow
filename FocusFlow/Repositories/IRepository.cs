namespace FocusFlow.Repositories;

public interface IRepository<T>
{
    Task<T?> GetByIdAsync(int id);
    Task<IEnumerable<T>> GetAllAsync();
    Task AddAsync(T entity);
    void Add(T entity);
    void Delete(T entity);
    Task SaveChangesAsync();
    void SaveChanges();
}