#include <stdio.h>

int main() {
    FILE *f = fopen("r.txt", "w");
    fprintf(f, "%d", 2 + 3);
    fclose(f);
}
