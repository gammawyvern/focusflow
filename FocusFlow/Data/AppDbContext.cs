using Microsoft.EntityFrameworkCore;

using FocusFlow.Data.Entities;

namespace FocusFlow.Data;

public class AppDbContext : DbContext
{
    public DbSet<TaskItem> TaskItems { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
        
    }
}