import (
	"math/rand"
)


var (
	LowerCaseLettersCharset = []rune("abcdefghijklmnopqrstuvwxyz")
	UpperCaseLettersCharset = []rune("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
	LettersCharset          = append(LowerCaseLettersCharset, UpperCaseLettersCharset...)
	NumbersCharset          = []rune("0123456789")
	AlphanumericCharset     = append(LettersCharset, NumbersCharset...)
	SpecialCharset          = []rune("!@#$%^&*()_+-=[]{}|;':\",./<>?")
	AllCharset              = append(AlphanumericCharset, SpecialCharset...)
)

func RandomString(size int, charset []rune) string {
	if size <= 0 {
		panic("Size parameter must be greater than 0")
	}

	if len(charset) <= 0 {
		panic("Charset parameter must not be empty")
	}

	b := make([]rune, size)

	possibleCharactersCount := len(charset)

	for i := range b {
		b[i] = charset[rand.Intn(possibleCharactersCount)]
	}

	return string(b)
}