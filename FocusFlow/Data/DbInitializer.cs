using FocusFlow.Data.Entities;

namespace FocusFlow.Data;

public static class DbInitializer
{
    public static void Seed(AppDbContext context)
    {
        var seedTasks = new List<TaskItem>
        {
            new TaskItem
            {
                Title = "Create Database",
                Description = "Setup MySQL and install SSMS.",
                DueDate = DateTime.Today,
                SecondsLogged = 600
            },
            new TaskItem
            {
                Title = "",
                Description = "Task without title",
                DueDate = DateTime.Today,
                SecondsLogged = 4000
            },
            new TaskItem
            {
                Title = "Wipe butt",
                Description = "I forgot earlier",
                DueDate = DateTime.Today,
                SecondsLogged = 4046
            },
            new TaskItem
            {
                Title = "Task with just title",
                Description = "",
                DueDate = DateTime.Today
            },
            new TaskItem
            {
                Title = "Task with very long title and description word word word word word word word word word word word word word word",
                Description = "This is sample text that is long enough to not easily display on a short line. word word word word word word word word word word word word word word word word word word word word word word word word word word word word",
                DueDate = DateTime.Today
            }
        };
        
        seedTasks.AddRange(
            Enumerable.Range(1, 20).Select(num => new TaskItem
            {
                Title = $"Sample task {num}",
                Description = $"Sample description {num}",
                DueDate = DateTime.Today
            })
        );
        
        context.RemoveRange(context.TaskItems);
        context.TaskItems.AddRange(seedTasks);
        context.SaveChanges();
        Console.WriteLine("Reset and seeded Task database.");
    }
}