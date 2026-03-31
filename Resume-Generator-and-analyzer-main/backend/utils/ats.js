export function calculateATSScore(parsed) {
  let score = 0;
  const skills = parsed?.skills?.length || 0;
  const exp = parsed?.experience?.length || 0;
  const edu = parsed?.education?.length || 0;

  score += Math.min(skills * 6, 36);
  score += Math.min(exp * 20, 40);
  if (edu > 0) score += 12;
  if (parsed?.email) score += 4;
  if (parsed?.phone) score += 4;

  return Math.min(Math.round(score), 100);
}

export function calculateMatches(parsed) {
  const skills = parsed?.skills?.length || 0;
  const exp = parsed?.experience?.length || 0;

  return {
    skill_match: Math.min(Math.round(skills * 8), 100),
    experience_match: Math.min(Math.round(exp * 25), 100)
  };
}
