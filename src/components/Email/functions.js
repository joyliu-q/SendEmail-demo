const accounts = [
  "alain@wavelf.org",
  "allan@wavelf.org",
  "patrick@wavelf.org",
  "anastasia@wavelf.org",
  "andy@wavelf.org",
  "bhavya@wavelf.org",
  "cinny@wavelf.org",
  "dani@wavelf.org",
  "daniela@wavelf.org",
  "carter@wavelf.org",
  "emily@wavelf.org",
  "hannah@wavelf.org",
  "jahnavi@wavelf.org",
  "jill@wavelf.org",
  "jonny@wavelf.org",
  "jordan@wavelf.org",
  "joy@wavelf.org",
  "kevin@wavelf.org",
  "lily@wavelf.org",
  "linda@wavelf.org",
  "madison@wavelf.org",
  "melina@wavelf.org",
  "nikki@wavelf.org",
  "ruhi@wavelf.org",
  "sandra@wavelf.org",
  "shannon@wavelf.org",
  "shelby@wavelf.org",
  "joshua@wavelf.org",
  "sonia@wavelf.org",
  "steve@wavelf.org",
];

const str_range = (from, to, str) => {
  return from.localeCompare(str) <= 0 && str.localeCompare(to) < 0;
};

const sr = (from, to, email) => {
  return str_range(from, to, email);
};

export const getAccount = (lower) => {
  let account;
  if (!isNaN(lower.charAt(0))) {
    account = accounts[0];
  } else if (sr("a", "ab", lower)) {
    account = accounts[0];
  } else if (sr("ab", "al", lower)) {
    account = accounts[1];
  } else if (sr("al", "ar", lower)) {
    account = accounts[2];
  } else if (sr("ar", "bg", lower)) {
    account = accounts[3];
  } else if (sr("bg", "cb", lower)) {
    account = accounts[4];
  } else if (sr("cb", "cn", lower)) {
    account = accounts[5];
  } else if (sr("cn", "del", lower)) {
    account = accounts[6];
  } else if (sr("del", "eh", lower)) {
    account = accounts[7];
  } else if (sr("eh", "ez", lower)) {
    account = accounts[8];
  } else if (sr("ez", "go", lower)) {
    account = accounts[9];
  } else if (sr("go", "hol", lower)) {
    account = accounts[10];
  } else if (sr("hol", "jab", lower)) {
    account = accounts[11];
  } else if (sr("jab", "jf", lower)) {
    account = accounts[12];
  } else if (sr("jf", "juj", lower)) {
    account = accounts[13];
  } else if (sr("juj", "ken", lower)) {
    account = accounts[14];
  } else if (sr("ken", "lau", lower)) {
    account = accounts[15];
  } else if (sr("lau", "lor", lower)) {
    account = accounts[16];
  } else if (sr("lor", "mar", lower)) {
    account = accounts[17];
  } else if (sr("mar", "mir", lower)) {
    account = accounts[18];
  } else if (sr("mir", "nat", lower)) {
    account = accounts[19];
  } else if (sr("nat", "o", lower)) {
    account = accounts[20];
  } else if (sr("o", "ql", lower)) {
    account = accounts[21];
  } else if (sr("ql", "roh", lower)) {
    account = accounts[22];
  } else if (sr("roh", "saw", lower)) {
    account = accounts[23];
  } else if (sr("saw", "si", lower)) {
    account = accounts[24];
  } else if (sr("si", "suj", lower)) {
    account = accounts[25];
  } else if (sr("suj", "thu", lower)) {
    account = accounts[26];
  } else if (sr("thu", "vh", lower)) {
    account = accounts[27];
  } else if (sr("vh", "w", lower)) {
    account = accounts[28];
  } else if (sr("w", "zzzzz", lower)) {
    account = accounts[29];
  }
  return account;
};
// const gmailEmail = functions.config().gmail.email
// const gmailPassword = functions.config().gmail.password
