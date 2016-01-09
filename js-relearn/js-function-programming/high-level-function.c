/*******************************************************
    > File Name: high-level-function.c
    > Author: IndexXuan
    > Mail: indexxuan@gmail.com
    > Created Time: 2015年06月01日 星期一 16时39分53秒
 ******************************************************/

#include <stdio.h>
void map(int *array, int length, int (*func)(int));

// implement of function map
void map(int* array, int length, int (*func)(int)) {
	int i = 0;
	for (i = 0; i < length; i++) {
		array[i] = func(array[i]);
	}
}

void printArray(int* array, int len) {
	printf("the array is : ");
	int i;
  for (i = 0; i < len; i++) {
		printf("%d, ", array[i]);
	}
	printf("\n");
}

int twice(int num) { return num * 2; }
int triple(int num) { return num * 3; }

// function main
int main()
{
	int array[5] = {1, 2, 3, 4 ,5};
	int i = 0; 
	int len = 5;
	// print the orignal array
	for (i = 0; i < len; i++) {
		printArray(array, len);

	    // mapped by twice
		map(array, len, twice);
	}
	return 0;
}
