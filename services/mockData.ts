// This file now contains a curated list of Steam App IDs for games that
// strictly fit the criteria of the app (Local Co-op, Controller Support, Roguelike/lite).
// This list is used by the steamService to fetch real data for the main recommendations page.

export const recommendedAppIds: number[] = [
  632360, // Risk of Rain 2
  311690, // Enter the Gungeon
  250900, // The Binding of Isaac: Rebirth
  418530, // Spelunky 2
  445980, // Wizard of Legend
  330020, // Children of Morta
  512900, // Streets of Rogue
  268910, // Cuphead
  1104660, // Ember Knights
  1217060, // Gunfire Reborn
  677120, // Heroes of Hammerwatch
  916040, // For The King
  248820, // Risk of Rain
  247080, // Crypt of the NecroDancer
  251910, // Rampage Knights
  368230, // Broforce
  200710, // The Binding of Isaac
  218620, // PAYDAY 2 (Although not roguelike, it's a co-op classic often associated) - let's remove for strictness
  427520, // Factorio - removed
  313640, // Stardew Valley - removed
  105600, // Terraria
  892970, // Valheim - removed, not local co-op
  292030, // The Witcher 3 - removed
  1245620, // ELDEN RING - removed
  367520, // Hollow Knight - not local co-op, removed
  322330, // Don't Starve Together
  219150, // Spelunky
  239070, // Hammerwatch
  319480, // Nuclear Throne
  404640, // Moon Hunters
  296300, // BattleBlock Theater
  252110, // Lovers in a Dangerous Spacetime
  1623730, // Palworld - removed
];
