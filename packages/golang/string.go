import (
	"math/rand"
	"strings"
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


func Substring[T ~string](str T, offset int, length  uint) T {
	// 将于string相关的变量str转换为rune类型的切片
	result := []rune(str)
	size := len(result)

	// 处理到哪个offser为负索引
	if offset < 0 {
		offset = size + offset
		if offset < 0 {
			offset = 0
		}
	}

	if offset > size {
		return T(str)
	}

	// 防止length溢出
	if length > uint(size)-uint(offset) {
		length = uint(size - offset)
	}

	return T(strings.Replace(string(result[offset:offset+int(length)]), "\x00", "", -1))

}