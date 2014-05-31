all: dict-igo.zip anti-dict-igo.zip

dict-igo/word.dat: dict/words.csv
	java -cp igo-0.4.5.jar net.reduls.igo.bin.BuildDic dict-igo dict utf-8

anti-dict-igo/word.dat: anti-dict/words.csv
	java -cp igo-0.4.5.jar net.reduls.igo.bin.BuildDic anti-dict-igo anti-dict utf-8

dict-igo.zip: dict-igo/word.dat
	cd dict-igo && zip -9 ../dict-igo.zip *

anti-dict-igo.zip: anti-dict-igo/word.dat
	cd anti-dict-igo && zip -9 ../anti-dict-igo.zip *

dict/words.csv anti-dict/words.csv: words.csv
	python make-dic.py

clean:
	rm dict/words.csv anti-dict/words.csv
	rm dict-igo/*
	rm anti-dict-igo/*
	rm dict-igo.zip anti-dict-igo.zip
