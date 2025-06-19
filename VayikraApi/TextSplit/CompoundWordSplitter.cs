using Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace VayikraApi.Business.BL.TextSplit
{
    public static class CompoundWordSplitter
    {

        public static List<string> Split(string textToSplit)
        {
            ReadUpBooksContext context = new ReadUpBooksContext();

            List<SplitRules> compoundWordRules = context.SplitRules.Where(rule => rule.Key == "compound word").ToList();

            HashSet<string> compoundWords = new HashSet<string>(compoundWordRules.Select(r => r.Value));

            var processedWords = new List<string>();

            var words = textToSplit.Split(new[] { ' ', '\n' }, StringSplitOptions.RemoveEmptyEntries)
                            .ToList();
            words = words.Select(word => word.Trim().Replace("\r","")).ToList();


            for (int i = 0; i < words.Count; i++)
            {
                if (i + 1 < words.Count)
                {
                    string potentialCompoundWord = $"{words[i]} {words[i + 1]}";
                    if (compoundWords.Contains(potentialCompoundWord))
                    {
                        processedWords.Add(potentialCompoundWord);
                        i++;
                        continue;
                    }
                }

                processedWords.Add(words[i]);
            }

            return processedWords;
        }
    }
}
