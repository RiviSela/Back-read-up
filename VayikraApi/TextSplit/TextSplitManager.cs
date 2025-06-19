using Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VayikraApi.Business.BL.TextSplit
{
    public static class TextSplitManager
    {
        public static string TextSplitOld(string flashinstructionsOriginal)
        {
            string res = "";
            var flashinstructions = flashinstructionsOriginal.Replace("\r\n", " ");
            flashinstructions = flashinstructions.Replace("\n", " ");

            ReadUpBooksContext context = new ReadUpBooksContext();
            List<SplitRules> splitruls = context.SplitRules.Where(x => x.Key == "punctuation").ToList();
            List<List<string>> fullList = new List<List<string>>();
            List<string> inner = new List<string>();

            inner = flashinstructions.Split(' ').ToList();

            splitruls = context.SplitRules.Where(x => x.Key == "compound word").ToList();
            //compound word	

            for (int i = 0; i < inner.Count - 1; i++)
            {
                try
                {
                    SplitRules sr = splitruls.FirstOrDefault(x => x.Value.ToLower() == inner[i].ToString().ToLower() + " " + inner[i + 1].ToString().ToLower());
                    if (sr != null && sr.Key == "compound word")
                    {
                        if (inner[i] + " " + inner[i + 1] == sr.Value)
                        {
                            inner[i] = inner[i] + " " + inner[i + 1];
                            inner.RemoveAt(i + 1);
                        }
                    }
                }
                catch { }


            }

            List<string> tmpList = new List<string>();
            splitruls = context.SplitRules.Where(x => x.Key == "punctuation").ToList();

            foreach (var word in inner)
            {
                if (word.Trim() != "")
                {
                    SplitRules sr = splitruls.FirstOrDefault(x => x.Value == word.Trim()[word.Trim().Length - 1].ToString());

                    if (sr != null && sr.Key == "punctuation")
                    {
                        if (sr.Timing == "after")
                        {
                            tmpList.Add(word.Trim());
                            fullList.Add(tmpList);
                            tmpList = new List<string>();
                        }
                        else
                        {
                            fullList.Add(tmpList);
                            tmpList = new List<string>();
                            tmpList.Add(word.Trim());
                        }
                    }
                    else
                    {
                        tmpList.Add(word.Trim());
                    }


                }
            }

            splitruls = context.SplitRules.Where(x => x.Key == "Conjunctions").ToList();
            //Conjunctions
            bool go = true;
            while (go)
            {
                go = false;
                for (int i = 0; i < fullList.Count - 1; i++)
                {
                    var currentList = fullList[i];
                    var nextList = fullList[i + 1];

                    if (currentList.Count > 5)
                    {
                        // Find the intersection of the current list and splitruls based on the Value property
                        var intersection = currentList
                            .Where(cell => splitruls.Any(rule => rule.Value.ToLower() == cell.ToLower()))
                            .ToList();

                        if (intersection.Any())
                        {
                            // Split the list into two lists
                            int indexToSplit = currentList.IndexOf(intersection.First());
                            while (intersection.Count > 0)
                            {
                                if (indexToSplit > 0)
                                    break;
                                else
                                    intersection.RemoveAt(0);
                            }
                            if (indexToSplit > 0)
                            {

                                List<string> firstPart = currentList.Take(indexToSplit).ToList();
                                List<string> secondPart = currentList.Skip(indexToSplit).ToList();



                                // Update the original list
                                currentList.Clear();
                                currentList.AddRange(firstPart);
                                go = true;
                                // Insert the second part into the next list
                                //   nextList.InsertRange(0, intersection);
                                if (secondPart.Count > 0)
                                    fullList.Insert(i + 1, secondPart);
                                //   nextList.InsertRange(1, secondPart);

                            }
                        }
                    }
                }
            }

            //split 7
            for (int i = 0; i < fullList.Count; i++)
            {
                var innerList = fullList[i];

                if (innerList.Count >= 7)
                {
                    // Split the list after the 5th cell
                    List<string> firstPart = innerList.GetRange(0, 5);
                    List<string> secondPart = innerList.GetRange(5, innerList.Count - 5);

                    // Update the original list
                    innerList.Clear();
                    innerList.AddRange(firstPart);

                    // Insert the second part as a new list after the current one
                    fullList.Insert(i + 1, secondPart);
                }
            }

            fullList.RemoveAll(innerList => innerList.Count == 0);
            res = string.Join(Environment.NewLine, fullList.Select(innerList => string.Join(" ", innerList)));

            return res;

        }


        public static string TextSplit(string flashInstructionOriginal)
        {

            var afterCompoundSplitter = CompoundWordSplitter.Split(flashInstructionOriginal);

            var afterPunactionSPlit = PuncuationSplitter.Split(afterCompoundSplitter);

            var afterConjunctions = ConjunctionsSplitter.Split(afterPunactionSPlit);

            var afterCheckListBiggerThanSeven = CheckLenght.Split(afterConjunctions);


            var ListToStingResult = GetTextSplitResultString(afterCheckListBiggerThanSeven);

            return ListToStingResult;
        }


        public static string GetTextSplitResultString(List<List<string>> flashInstructionOriginal)
        {
            return TextSplitResult.ListOfListsToString(flashInstructionOriginal);
        }
    }
}
