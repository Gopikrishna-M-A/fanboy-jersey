import Team from '../models/team.js';

export const getTeam = async (req, res) => {
  try {
    const teamId = req.params.teamId;
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json(team);
  } catch (error) {
    console.error('Error getting team by ID:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
}

export const getAllTeam = async (req, res) => {
  try {
   
    const team = await Team.find({});
    if (!team) {
      return res.status(404).json({ error: 'No team found' });
    }
    res.json(team);
  } catch (error) {
    console.error('Error getting teams', error);
    res.status(500).json({ error: 'An error occurred' });
  }
}

export const createTeam = async (req, res) => {
  try {
    // Implement the logic to create a new team here
    // You'll need to validate input and save the team
    
    const newTeam = new Team(req.body);
    await newTeam.save();
    
    // Once the team is created successfully, return the team details
    res.json({ message: 'Team created successfully', team: newTeam });
  } catch (error) {
    console.error('Error creating team:', error);
    res.status(400).json({ error: 'Bad request' });
  }
}

export const updateTeam = async (req, res) => {
  try {
    const teamId = req.params.teamId;

    // Implement the logic to update the team based on the request data
    // You may want to validate input
    
    const updatedTeam = await Team.findByIdAndUpdate(teamId, req.body, { new: true });
    
    if (!updatedTeam) {
      return res.status(404).json({ error: 'Team not found' });
    }

    // Once the team is updated successfully, return the updated team details
    res.json({ message: 'Team updated successfully', team: updatedTeam });
  } catch (error) {
    console.error('Error updating team by ID:', error);
    res.status(400).json({ error: 'Bad request' });
  }
}

export const removeTeam = async (req, res) => {
  try {
    const teamId = req.params.teamId;

    // Implement the logic to remove the team by ID
    // You may want to add validation and confirmation steps
    
    const deletedTeam = await Team.findByIdAndDelete(teamId);
    
    if (!deletedTeam) {
      return res.status(404).json({ error: 'Team not found' });
    }
    
    res.json({ message: 'Team removed successfully' });
  } catch (error) {
    console.error('Error removing team by ID:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
}
