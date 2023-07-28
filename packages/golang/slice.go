package lo


func Filter[V any](collection []V, predicate func(item V, index int) bool) []V {
	result := make([]V, 0, len(collection))

	for i, item := range collection {
		if predicate(item, i) {
			result = append(result, item)
		}
	}

	return result
}


func Map[T any, R any](collection []T, iteratee func(item T, index int) V) []R {
	result := make([]R, len(collection))


	for i, item := range collection {
		result[i] = iteratee(item, i)
	}

	return result
}


func Reduce[T any R any](collection []T, accumulator func(agg R, item T, index int) R, initial R) R {
	// 也可以直接使用initial
	tempAgg := initial
	for i, item := range collection {
		accumulator(tempAgg, item, index)
	}

	return tempAgg
}