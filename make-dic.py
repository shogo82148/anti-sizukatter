#!/usr/bin/env python
# -*- coding:utf-8 -*-

import codecs

def cost(word):
    return int(max(-36000, -400 * (len(word) ** 1.5) ))

def make_sizukatter(words):
    with codecs.open("dict/words.csv", "w", "utf-8") as f:
        for a, b in words:
            row = [a, "0", "0", str(cost(a)), b];
            f.write(','.join(row) + "\n")
    return

def make_anti_sizukatter(words):
    # remove duplicated entry
    sorted_words = sorted(words)
    sizukatter_dict = {}
    for a, b in sorted_words:
        sizukatter_dict[b] = a

    with codecs.open("anti-dict/words.csv", "w", "utf-8") as f:
        for word in sorted(sizukatter_dict.iterkeys()):
            row = [word, "0", "0", str(cost(word)), sizukatter_dict[word]];
            f.write(','.join(row) + "\n")
    return

def main(words_file):
    with codecs.open(words_file, 'r', 'utf-8') as f:
        words = [ line.strip().split(',') for line in f ]
    make_sizukatter(words)
    make_anti_sizukatter(words)
    return

if __name__ == '__main__':
    main("words.csv")
