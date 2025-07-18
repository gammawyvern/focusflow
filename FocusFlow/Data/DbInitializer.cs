using Task = FocusFlow.Data.Entities.Task;

namespace FocusFlow.Data;

public static class DbInitializer
{
    public static void Seed(AppDbContext context)
    {
        var seedTasks = new List<Task>
        {
            new Task
            {
                Title = "Create Database",
                Description = "Setup MySQL and install SSMS.",
                DueDate = DateOnly.FromDateTime(DateTime.Now)
            },
            new Task
            {
                Title = "",
                Description = "Task without title",
                DueDate = DateOnly.FromDateTime(DateTime.Now)
            },
            new Task
            {
                Title = "Wipe butt",
                Description = "I forgot earlier",
                DueDate = DateOnly.FromDateTime(DateTime.Now)
            },
            new Task
            {
                Title = "Task with just title",
                Description = "",
                DueDate = DateOnly.FromDateTime(DateTime.Now)
            },
            new Task
            {
                Title = "Task with very long title and description word word word word word word word word word word word word word word",
                Description = "This is sample text that is long enough to not easily display on a short line. word word word word word word word word word word word word word word word word word word word word word word word word word word word word",
                DueDate = DateOnly.FromDateTime(DateTime.Now)
            }
        };
        
        seedTasks.AddRange(
            Enumerable.Range(1, 20).Select(num => new Task
            {
                Title = $"Sample task {num}",
                Description = $"Sample description {num}",
                DueDate = DateOnly.FromDateTime(DateTime.Now)
            })
        );
        
        context.RemoveRange(context.Tasks);
        context.Tasks.AddRange(seedTasks);
        context.SaveChanges();
        Console.WriteLine("Reset and seeded Task database.");
    }
}