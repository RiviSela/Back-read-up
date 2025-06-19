using Data.Models;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VayikraApi.Business.BL.TextSplit
{
    public static class ConjunctionsSplitter
    {
        public static List<List<string>> Split(List<List<string>> textToSplit)
        {
            ReadUpBooksContext context = new ReadUpBooksContext();

            var conjunctionRulesWithTiming = context.SplitRules
                                                    .Where(rule => rule.Key == "Conjunctions")
                                                    .Select(rule => new { rule.Value, rule.Timing })
                                                    .ToList();

            var processedLists = new List<List<string>>();

           
            foreach (var list in textToSplit)
            {
                if (list.Count <= 5)
                {
                    processedLists.Add(list);
                    continue;
                }

                var splitIndexes = list.Select((word, index) => new { Word = word, Index = index })
                                        .Where(x => conjunctionRulesWithTiming.Any(cwt => cwt.Value.Equals(
                                            // Remove punctuation from the word before comparison
                                            new string(x.Word.Where(char.IsLetterOrDigit).ToArray()),
                                            StringComparison.OrdinalIgnoreCase)))
                                        .Select(x => x.Index).ToList();


                if (splitIndexes.Count == 0)
                {
                    processedLists.Add(list);
                    continue;
                }


                List<int> validSplitIndexes = new List<int>();

                for (int i = 0; i < splitIndexes.Count; i++)
                {
                    var conjunctionWithTiming = conjunctionRulesWithTiming.FirstOrDefault(cwt => cwt.Value.Equals(list[splitIndexes[i]], StringComparison.OrdinalIgnoreCase));
                    bool isAfterTiming = conjunctionWithTiming != null && conjunctionWithTiming.Timing.Equals("after", StringComparison.OrdinalIgnoreCase);

                    // Skip the first index if it's 0 and not part of a consecutive sequence
                    bool isPartOfConsecutiveSequence = i < splitIndexes.Count - 1 && splitIndexes[i] + 1 == splitIndexes[i + 1];
                    if (splitIndexes[i] == 0 && !isPartOfConsecutiveSequence)
                    {
                        continue;
                    }

                    // Check if this index is part of a consecutive sequence

                    // If it's the last index in the sequence or not part of a consecutive sequence
                    if (!isPartOfConsecutiveSequence || i == splitIndexes.Count - 1)
                    {
                        // Determine the index to add, adjusting for "after" timing if applicable and not part of consecutive sequence
                        var currentIndex = splitIndexes[i];
                        if (isAfterTiming && !isPartOfConsecutiveSequence) // Adjust for after timing if not in consecutive sequence
                        {
                            currentIndex += 1;
                        }

                        if (currentIndex < list.Count) // Check bounds
                        {
                            validSplitIndexes.Add(currentIndex);
                        }
                    }
                    // If it's part of a consecutive sequence, we skip adding it directly
                    // since we want to add only after the last consecutive index, but adjust for "after" if it's the last in sequence
                    else if (isPartOfConsecutiveSequence)
                    {
                        // Add +1 to index if it's the last in a consecutive sequence and "after" timing
                        validSplitIndexes.Add(splitIndexes[i] + 2);
                        i=i + 1;
                    }
                }

                int previousSplit = 0;
                foreach (var index in validSplitIndexes)
                {
                    // Always perform the first split after skipping index 0
                    if (previousSplit == 0)
                    {
                        var segment = list.GetRange(previousSplit, index - previousSplit);
                        processedLists.Add(segment);
                        previousSplit = index;
                    }
                    else if (list.Count - previousSplit > 7) // Check if remaining list after split is greater than 7
                    {
                        var segment = list.GetRange(previousSplit, index - previousSplit);
                        processedLists.Add(segment);
                        previousSplit = index;
                    }
                    // No need to explicitly handle the last split here, as we only split if the remaining list is > 7
                }

                // Add the remaining part of the list, if any
                if (previousSplit < list.Count)
                {
                    var lastSegment = list.GetRange(previousSplit, list.Count - previousSplit);
                    processedLists.Add(lastSegment);
                }
            }


                return processedLists;
        }
    }
}
