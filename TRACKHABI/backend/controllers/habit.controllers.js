import Habit from "../models/habit.models.js";


export const getHabits = async (req, res) => {
 const habits = await Habit.find({
  userId: req.userId,
});

  if(!habits) return res.status(200).json({message : "No Habit there"});

  res.json(habits);
};


export const addHabit = async (req, res) => {
  const { title, note, startDate, priority, color, icon } = req.body;

  const newHabit = new Habit({
    userId: req.userId,
    title,
    note,
    startDate,
    priority,
    color,
    icon,
    completedDates: [],
  });

  

  await newHabit.save();
  res.json(newHabit);
};

// export const addHabit = async (req, res) => {

//   const { title,completedDates } = req.body;

//   if(!title) return res.status(400).json({message: "give Title"});

//   const newHabit = new Habit({
//     title,
//     completedDates
//   });

//   await newHabit.save();
//   res.json(newHabit);
// };

export const toggleHabit = async (req, res) => {

const habit = await Habit.findOne({
  _id: req.params.id,
  userId: req.userId,
});

  const today = new Date().toISOString().split("T")[0];

  if (habit.completedDates.includes(today)) {
    habit.completedDates = habit.completedDates.filter(d => d !== today);
  } else {
    habit.completedDates.push(today);
  }

  await habit.save();
  res.json(habit);
};


export const deleteHabit = async (req, res) => {
  try {
    const deletedHabit = await Habit.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!deletedHabit) {
      return res.status(404).json({
        message: "Habit not found",
      });
    }

    res.json({
      message: "Habit deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const updateHabit = async (req, res) => {
  const { title } = req.body;

  const updated = await Habit.findByIdAndUpdate(
    req.params.id,
    { title },
    { new: true }
  );

  res.json(updated);
};




 export const getStats = async (req, res) => {

  const habits = await Habit.find({
  userId: req.userId,
});

  const today = new Date().toISOString().split("T")[0];

  const totalHabits = habits.length;

  let completedToday = 0;

  habits.forEach((habit) => {
    if (habit.completedDates.includes(today)) {
      completedToday++;
    }
  });

  
  const completionRate =
    totalHabits === 0 ? 0 : Math.round((completedToday / totalHabits) * 100);

  //const leastHabits = totalHabits/2;
  
  let streak = 0;
  let currentDate = new Date();

  

  while (true) {
    const dateStr = currentDate.toISOString().split("T")[0];

    const allCompleted = habits.every((habit) =>
      habit.completedDates.includes(dateStr)
    );

     const completedCount = habits.filter((habit) =>
    habit.completedDates.includes(dateStr)
  ).length;


    if (completedCount >= 3) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }

  res.json({
    totalHabits,
    completedToday,
    completionRate,
    streak,
  });
};





// export const getStats = async (req, res) => {
//   try {
//     // 1. PERFORMANCE: Always filter by the current user
//     const userId = req.user.id; // Or however you track sessions
//     const habits = await Habit.find({ userId });

//     const totalHabits = habits.length;
//     if (totalHabits === 0) {
//       return res.json({ totalHabits: 0, completedToday: 0, completionRate: 0, streak: 0 });
//     }

//     // 2. TIMEZONE FIX: Get localized YYYY-MM-DD string based on server/user timezone
//     const getLocalDateString = (date) => {
//       return date.toLocaleDateString("en-CA"); // Outputs exactly "YYYY-MM-DD"
//     };

//     const todayStr = getLocalDateString(new Date());

//     // 3. Calculate completed today
//     let completedToday = 0;
//     habits.forEach((habit) => {
//       if (habit.completedDates.includes(todayStr)) {
//         completedToday++;
//       }
//     });

//     const completionRate = Math.round((completedToday / totalHabits) * 100);

//     // 4. Streak Calculation (Safe from infinite loops)
//     let streak = 0;
//     let checkDate = new Date();
    
//     // Safety check: Don't look back further than 365 days (or check against account creation date)
//     for (let i = 0; i < 365; i++) {
//       const dateStr = getLocalDateString(checkDate);

//       const allCompleted = habits.every((habit) =>
//         habit.completedDates.includes(dateStr)
//       );

//       if (allCompleted) {
//         streak++;
//         checkDate.setDate(checkDate.getDate() - 1); // Go back one day
//       } else {
//         // If they missed habits today, check if they completed them yesterday to keep an old streak alive
//         if (i === 0) {
//           checkDate.setDate(checkDate.getDate() - 1);
//           const completedYesterday = habits.every((habit) =>
//             habit.completedDates.includes(getLocalDateString(checkDate))
//           );
//           if (completedYesterday) {
//             // Streak is alive from yesterday, keep looping
//             continue; 
//           }
//         }
//         break; // Streak broken
//       }
//     }

//     res.json({
//       totalHabits,
//       completedToday,
//       completionRate,
//       streak,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

